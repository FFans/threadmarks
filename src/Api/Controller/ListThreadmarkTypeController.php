<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkTypeSerializer;
use FFans\Threadmarks\Model\ThreadmarkType;
use FFans\Threadmarks\Service\ThreadmarkTypeService;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListThreadmarkTypeController extends AbstractListController
{
    public $serializer = ThreadmarkTypeSerializer::class;
    public $sortFields = ['position'];
    public $sort = ['position' => 'asc'];

    public function __construct(protected ThreadmarkTypeService $service)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return ThreadmarkType::query()->orderBy('position', $this->extractSort($request)['position'] ?? 'asc')->orderBy('id')->get();
    }
}
