<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkSerializer;
use FFans\Threadmarks\Service\ThreadmarkService;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateThreadmarkController extends AbstractCreateController
{
    public $serializer = ThreadmarkSerializer::class;
    public $include = ['type', 'post'];
    public $optionalInclude = ['discussion', 'post', 'type'];

    public function __construct(protected ThreadmarkService $service)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        return $this->service->save(Arr::get($request->getParsedBody(), 'data', []), $actor, false);
    }
}
