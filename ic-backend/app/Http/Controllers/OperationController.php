<?php

namespace App\Http\Controllers;

use App\Exceptions\InvestmentNotInWalletException;
use App\Http\Requests\CreateOperationRequest;
use App\Http\Requests\UpdateOperationRequest;
use App\Http\Services\OperationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function index(Request $request)
    {
        // Records per page (default: 10)
        $perPage = $request->query('per_page', 5);

        // Current page (default: 1)
        $currentPage = $request->query('page', 1);

        $operations = $this->operationService->getAllOperations(Auth::id(), $currentPage, $perPage);
        return response()->json($operations);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateOperationRequest $request)
    {
        try {
            $data = $request->only([
                'operation_type_id',
                'investment_id',
                'currency_type_id',
                'operation_date',
                'quantity',
                'unit_price',
                'operation_value'
            ]);
            $operation = $this->operationService->createOperation($data);

            // Returns the just created operation as a response
            return response()->json($operation, 201);
        } catch (InvestmentNotInWalletException $e) {
            // Catches the custom exception
            return response()->json([
                'error' => 'Validation Error',
                'message' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'An error occurred when trying to create an operation.',
                'message' => $e->getMessage(),
            ], 500);
        }
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
        return response()->json(['message' => 'Operation successfully updated', 'operation' => $operation]);
    }

    /**
     * @param  int  $operation_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $operation_id)
    {
        try {
            $operation = $this->operationService->getOperationById($operation_id);

            if (!$operation) {
                return response()->json(['message' => 'Operation not found'], 404);
            }

            // Tries to delete the operation
            $this->operationService->deleteOperation($operation);

            return response()->json(['message' => 'Operation successfully deleted'], 200);

        } catch (\Exception $e) {
            // Returns the error message if the exception occurs
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
