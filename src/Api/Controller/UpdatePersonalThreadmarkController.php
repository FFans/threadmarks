<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Api\Serializer\PersonalThreadmarkSerializer;
use FFans\Threadmarks\Service\ThreadmarkService;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdatePersonalThreadmarkController extends AbstractShowController
{
    public $serializer = PersonalThreadmarkSerializer::class;
    public $include = ['type'];
    public $optionalInclude = ['discussion', 'post', 'type'];

    public function __construct(protected ThreadmarkService $service)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        return $this->service->save(Arr::get($request->getParsedBody(), 'data', []), $actor, true, (string) Arr::get($request->getQueryParams(), 'id'));
    }
}
