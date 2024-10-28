<?php

namespace App\Repositories\Eloquent;

use App\Models\Operation;
use App\Repositories\Contracts\OperationRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class OperationRepository implements OperationRepositoryInterface
{
    protected $model;

    public function __construct(Operation $model)
    {
        $this->model = $model;
    }

    public function createOperation(array $data)
    {
        return $this->model->create($data);
    }

    public function getAllOperations(int $userId, int $currentPage, int $perPage): LengthAwarePaginator
    {
        return $this->model
            ->with(['operationType', 'currencyType', 'investment'])
            ->where('user_id', $userId)
            ->paginate($perPage, ['*'], 'page', $currentPage);
    }

    public function findOperationById(int $userId, int $operationId): Operation
    {
        return $this->model
            ->with('operationType')
            ->with('currencyType')
            ->with(['investment' => function ($query) {
                $query->with('investmentType'); // Brings investment_type within investment
            }])
            ->where('user_id', $userId)
            ->where('operation_id', $operationId)
            ->first();
    }

    public function updateOperation(Operation $operation, array $data)
    {
        $operation->update($data);
        return $operation;
    }

    public function deleteOperation(Operation $operation): bool
    {
        return $operation->delete();
    }
}
