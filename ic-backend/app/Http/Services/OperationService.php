<?php

namespace App\Http\Services;

use App\Models\Operation;
use App\Models\OperationType;
use App\Repositories\Eloquent\OperationRepository;
use App\Repositories\Eloquent\WalletInvestmentRepository;
use Illuminate\Support\Facades\Auth;

class OperationService
{
    protected $operationRepository;
    protected $walletService;
    protected $walletInvestmentRepository;

    public function __construct(
        OperationRepository $operationRepository,
        WalletService $walletService,
        WalletInvestmentRepository $walletInvestmentRepository)
    {
        $this->operationRepository = $operationRepository;
        $this->walletService = $walletService;
    }

    public function createOperation(array $data)
    {
        $data['user_id'] = Auth::id();

        if ($data['operation_type_id'] === OperationType::PURCHASE) {
            $operation = $this->purchaseInvestment($data);
        } else {
            $operation = $this->sellInvestment($data);
        }
        return $operation;
    }

    private function purchaseInvestment($data)
    {
        // Creates the operation
        $totalQuantityBeforeCreation = $this->operationRepository->calculateTotalQuantity($data['investment_id'], $data['user_id']);
        $operation = $this->operationRepository->createOperation($data);

        if ($totalQuantityBeforeCreation === 0) {
            $this->walletService->addToWallet($data);
        }

        return $operation;
    }

    private function sellInvestment($data)
    {
        $user = Auth::user();
        $wallet = $user->wallet;

        $isInvestmentInTheWallet = $this->walletInvestmentRepository->isInvestmentInWallet($wallet->wallet_id, $data['investment_id']);

        // Only allows to sell an investment if it is in the wallet
        if (!is_null($isInvestmentInTheWallet)) {
            $operation = $this->operationRepository->createOperation($data);
            $totalQuantityAfterCreation = $this->operationRepository->calculateTotalQuantity($data['investment_id'], $data['user_id']);

            if ($totalQuantityAfterCreation === 0) {
                $this->walletService->removeFromWallet($operation->investment_id);
            }
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
        $userId = Auth::user()->id;
        $deletedOperation = $this->operationRepository->deleteOperation($operation);
        $totalQuantity = $this->operationRepository->calculateTotalQuantity($operation->investment_id, $userId);

        // Updates the wallet based on investment quantity
        if ($totalQuantity == 0) {
            $this->walletService->removeFromWallet($operation->investment_id);
        }

        return $deletedOperation;
    }
}
