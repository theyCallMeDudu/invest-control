<?php

namespace App\Http\Services;

use App\Models\Operation;
use App\Models\OperationType;
use App\Repositories\Contracts\OperationRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class OperationService
{
    protected $operationRepository;
    protected $walletService;

    public function __construct(
        OperationRepositoryInterface $operationRepository,
        WalletService $walletService)
    {
        $this->operationRepository = $operationRepository;
        $this->walletService = $walletService;
    }

    public function createOperation(array $data)
    {
        $data['user_id'] = Auth::id();
        // $data['operation_value'] = $data['quantity'] * $data['unit_price'];

        // Creates the operation
        $operation = $this->operationRepository->createOperation($data);

        // Updates the wallet based on operation type
        if ($data['operation_type'] === OperationType::PURCHASE) {
            $this->walletService->addToWallet($data);
        } elseif ($data['operation_type'] === OperationType::SELL) {
            $this->walletService->removeFromWallet($data);
        }

        return $operation;
    }

    public function getAllOperations(int $userId, int $page, int $perPage)
    {
        return $this->operationRepository->getAllOperations($userId, $page, $perPage);
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
