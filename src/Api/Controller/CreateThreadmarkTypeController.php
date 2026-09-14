<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkTypeSerializer;
use FFans\Threadmarks\Model\ThreadmarkType;
use FFans\Threadmarks\Service\ThreadmarkTypeService;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateThreadmarkTypeController extends AbstractCreateController
{
    public $serializer = ThreadmarkTypeSerializer::class;

    public function __construct(protected ThreadmarkTypeService $service)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->service->save(Arr::get($request->getParsedBody(), 'data.attributes', []), RequestUtil::getActor($request));
    }
}
