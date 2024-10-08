<?php

namespace App\Repositories\Eloquent;

use App\Models\Investment;
use App\Repositories\Contracts\InvestmentRepositoryInterface;

class InvestmentRepository implements InvestmentRepositoryInterface
{
    protected $model;

    public function __construct(Investment $model)
    {
        $this->model = $model;
    }

    public function getAllInvestments(int $userId)
    {
        // Filtra os investimentos pelo usuário autenticado
        return $this->model->with('investmentType')
            ->where('user_id', $userId)
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
}
