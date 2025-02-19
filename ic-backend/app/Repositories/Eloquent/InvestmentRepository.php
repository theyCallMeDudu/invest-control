<?php

namespace App\Repositories\Eloquent;

use App\Models\Investment;
use App\Repositories\Contracts\InvestmentRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class InvestmentRepository implements InvestmentRepositoryInterface
{
    protected $model;

    public function __construct(Investment $model)
    {
        $this->model = $model;
    }

    public function getPaginatedInvestments(int $currentPage, int $perPage): LengthAwarePaginator
    {
        return $this->model
            ->with('investmentType')
            ->paginate(
                $perPage,
                ['investment_id', 'investment_name', 'investment_type_id'],
                'page',
                $currentPage
            );
    }

    public function getAllInvestments(): Collection
    {
        return $this->model
            ->with('investmentType')
            ->get();
    }

    public function createInvestment(array $data)
    {
        return $this->model->create($data);
    }

    public function findInvestmentById(int $investmentId)
    {
        return $this->model->with('investmentType')->find($investmentId);
    }

    public function updateInvestment(Investment $investment, array $data)
    {
        $investment->update($data);
        return $investment;
    }

    public function deleteInvestment(Investment $investment)
    {
        return $investment->delete();
    }

    public function getAvailableInvestmentYears(int $investment_id): array
    {
        return $this->model
            ->join('operation', 'investment.investment_id', '=', 'operation.investment_id')
            ->where('investment.investment_id', $investment_id)
            ->selectRaw('DISTINCT YEAR(operation_date) as year')
            ->orderBy('year', 'desc')
            ->pluck('year') // Gets only the years in the array
            ->toArray();
    }
}
