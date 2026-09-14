<?php

namespace FFans\Threadmarks\Api\Controller;

use FFans\Threadmarks\Model\ThreadmarkType;
use Flarum\Http\RequestUtil;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class OrderThreadmarkTypesController implements RequestHandlerInterface
{
    public function __construct(protected ConnectionInterface $db)
    {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        RequestUtil::getActor($request)->assertAdmin();

        $order = Arr::get($request->getParsedBody(), 'order');

        if (!is_array($order) || !array_is_list($order)
            || array_filter($order, fn ($id) => !is_int($id) && !(is_string($id) && ctype_digit($id)))
            || count(array_unique($order)) !== count($order)
            || ThreadmarkType::query()->whereIn('id', $order)->count() !== count($order)) {
            return new EmptyResponse(422);
        }

        $this->db->transaction(function () use ($order) {
            foreach ($order as $index => $id) {
                ThreadmarkType::where('id', $id)->update([
                    'position' => $index + 1,
                ]);
            }
        });

        return new EmptyResponse(204);
    }
}
