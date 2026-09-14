<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkTypeSerializer;
use FFans\Threadmarks\Model\ThreadmarkType;
use FFans\Threadmarks\Service\ThreadmarkTypeService;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class DeleteThreadmarkTypeController extends AbstractDeleteController
{
    public function __construct(protected ThreadmarkTypeService $service)
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->service->delete((string) Arr::get($request->getQueryParams(), 'id'), RequestUtil::getActor($request));
    }
}
