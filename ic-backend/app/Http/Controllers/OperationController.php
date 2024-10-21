<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOperationRequest;
use App\Http\Requests\UpdateOperationRequest;
use App\Http\Services\OperationService;

class OperationController extends Controller
{
    protected $operationService;

    // Injects OperationService in this Controller
    public function __construct(OperationService $operationService)
    {
        $this->operationService = $operationService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $operations = $this->operationService->getAllOperations();
        return response()->json($operations);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateOperationRequest $request)
    {
        $data = $request->only([
            'operation_type_id',
            'investment_id',
            'currency_type_id',
            'operation_date',
            'quantity',
            'unit_price'
        ]);
        $operation = $this->operationService->createOperation($data);

        // Returns the just created operation as a response
        return response()->json($operation, 201);
    }

    /**
     * @param  int  $operation_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(int $operation_id)
    {
        $operation = $this->operationService->getOperationById($operation_id);

        if (!$operation) {
            return response()->json(['message' => 'Operation not found'], 404);
        }

        return response()->json($operation);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $operation_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateOperationRequest $request, int $operation_id)
    {
        $operation = $this->operationService->getOperationById($operation_id);

        if (!$operation) {
            return response()->json(['message' => 'Operation not found'], 404);
        }

        $data = $request->only([
            'operation_type_id',
            'investment_id',
            'currency_type_id',
            'operation_date',
            'quantity',
            'unit_price'
        ]);

        $operation = $this->operationService->updateOperation($operation, $data);
        return response()->json(['message' => 'operation successfully updated', 'operation' => $operation]);
    }
}
