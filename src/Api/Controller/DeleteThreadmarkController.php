<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\ThreadmarkSerializer;
use FFans\Threadmarks\Service\ThreadmarkService;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class DeleteThreadmarkController extends AbstractDeleteController
{
    public function __construct(protected ThreadmarkService $service)
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->service->delete((string) Arr::get($request->getQueryParams(), 'id'), RequestUtil::getActor($request), false);
    }
}
