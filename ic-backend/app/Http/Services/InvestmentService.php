<?php

namespace App\Http\Services;

use App\Models\Investment;
use App\Repositories\Contracts\InvestmentRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class InvestmentService
{
    protected $investmentRepository;

    public function __construct(InvestmentRepositoryInterface $investmentRepository)
    {
        $this->investmentRepository = $investmentRepository;
    }

    public function getAllInvestments()
    {
        return $this->investmentRepository->getAllInvestments(Auth::id());
    }

    public function createInvestment(array $data)
    {
        $data['user_id'] = Auth::id();
        return $this->investmentRepository->createInvestment($data);
    }

    public function getInvestmentById(int $investmentId)
    {
        return $this->investmentRepository->findInvestmentById($investmentId);
    }

    public function updateInvestment(Investment $investment, array $data)
    {
        return $this->investmentRepository->updateInvestment($investment, $data);
    }

    public function deleteInvestment(Investment $investment)
    {
        // Checks if the investment is related to any operation
        if ($investment->operations()->exists()) {
            throw new \Exception("This investment cannot be excluded as it is related to one or more operations.");
        }
        return $this->investmentRepository->deleteInvestment($investment);
    }
}
