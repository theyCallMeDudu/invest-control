<?php

namespace App\Repositories\Eloquent;

use App\Models\Operation;
use App\Models\OperationType;
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

    public function getYearOperationsSummary(int $investmentId, int $year): array
    {
        // Gets the operations of the year grouped by month
        $operations = $this->model
            ->selectRaw('MONTH(operation_date) as month')
            ->selectRaw('SUM(quantity) as total_quantity')
            ->selectRaw('ROUND(AVG(unit_price), 2) as average_price')
            ->selectRaw('ROUND(SUM(quantity * unit_price), 2) as monthly_total')
            ->where('investment_id', $investmentId)
            ->whereYear('operation_date', $year)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month') // Organizes by month
            ->toArray();

        // Creates an array with 12 months. Future months receive 0
        $summary = [];
        for ($month = 1; $month <= 12; $month++) {
            $summary[] = [
                'month' => $month,
                'total_quantity' => $operations[$month]['total_quantity'] ?? 0,
                'average_price' => $operations[$month]['average_price'] ?? 0,
                'monthly_total' => $operations[$month]['monthly_total'] ?? 0,
            ];
        }

        return $summary;
    }

    private function getTotalPurchasedQuantity(int $investmentId, int $userId): int
    {
        return $this->model->where('investment_id', $investmentId)
                           ->where('user_id', $userId)
                           ->where('operation_type_id', OperationType::PURCHASE)
                           ->sum('quantity');
    }

    private function getTotalSoldQuantity(int $investmentId, int $userId): int
    {
        return $this->model->where('investment_id', $investmentId)
                           ->where('user_id', $userId)
                           ->where('operation_type_id', OperationType::SELL)
                           ->sum('quantity');
    }

    public function calculateTotalQuantity(int $investmentId, int $userId): int
    {
        return $this->getTotalPurchasedQuantity($investmentId, $userId) - $this->getTotalSoldQuantity($investmentId, $userId);
    }

   // Calculates total invested by operation type
   public function getTotalInvestedByOperationType(int $userId, int $operationType)
   {
       // Filters user operations with operation type
       return $this->model
           ->where('user_id', $userId)
           ->where('operation_type_id', $operationType)
           ->sum('operation_value');
   }
}
