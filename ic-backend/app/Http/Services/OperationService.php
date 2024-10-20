<?php

namespace App\Http\Services;

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
}
