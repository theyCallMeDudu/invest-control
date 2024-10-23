<?php

namespace App\Http\Services;

use App\Models\Operation;
use App\Repositories\Contracts\OperationRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class OperationService
{
    protected $operationRepository;

    public function __construct(OperationRepositoryInterface $operationRepository)
    {
        $this->operationRepository = $operationRepository;
    }

    public function createOperation(array $data)
    {
        $data['user_id'] = Auth::id();
        $data['operation_value'] = $data['quantity'] * $data['unit_price'];
        return $this->operationRepository->createOperation($data);
    }

    public function getAllOperations()
    {
        return $this->operationRepository->getAllOperations(Auth::id());
    }

    public function getOperationById(int $operationId): Operation
    {
        $userId = Auth::id();
        return $this->operationRepository->findOperationById($userId, $operationId);
    }

    public function updateOperation(Operation $operation, array $data)
    {
        $data['operation_value'] = $data['quantity'] * $data['unit_price'];
        return $this->operationRepository->updateOperation($operation, $data);
    }

    public function deleteOperation(Operation $operation)
    {
        return $this->operationRepository->deleteOperation($operation);
    }
}
