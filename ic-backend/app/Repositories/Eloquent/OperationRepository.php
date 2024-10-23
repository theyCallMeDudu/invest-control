<?php

namespace App\Repositories\Eloquent;

use App\Models\Operation;
use App\Repositories\Contracts\OperationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

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

    public function getAllOperations(int $userId)
    {
        return $this->model
            ->with('operationType')
            ->with('currencyType')
            ->with('investment')
            ->where('user_id', $userId)
            ->get();
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
