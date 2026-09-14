<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkSerializer;
use FFans\Threadmarks\Model\Threadmark;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListThreadmarksController extends AbstractListController
{
    public $serializer = ThreadmarkSerializer::class;
    public $limit = 50;
    public $maxLimit = 100;
    public $optionalInclude = ['type', 'post', 'discussion'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertAdmin();
        return Threadmark::query()->orderBy('id')->skip($this->extractOffset($request))->take($this->extractLimit($request))->get();
    }
}
