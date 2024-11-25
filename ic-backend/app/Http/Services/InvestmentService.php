<?php

namespace App\Http\Services;

use App\Models\Investment;
use App\Repositories\Contracts\InvestmentRepositoryInterface;
use App\Repositories\Contracts\OperationRepositoryInterface;
use App\Repositories\Eloquent\InvestmentRepository;
use Illuminate\Support\Facades\Auth;

class InvestmentService
{
    protected $investmentRepository;
    protected $operationRepository;

    public function __construct(
        InvestmentRepository $investmentRepository,
        OperationRepositoryInterface $operationRepository)
    {
        $this->investmentRepository = $investmentRepository;
        $this->operationRepository = $operationRepository;
    }

    public function getAllInvestments(int $page, int $perPage)
    {
        return $this->investmentRepository->getAllInvestments($page, $perPage);
    }

    public function createInvestment(array $data)
    {
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

    public function getAvailableInvestmentYears(int $investment_id)
    {
        return $this->investmentRepository->getAvailableInvestmentYears($investment_id);
    }

    public function getYearOperationsSummary(int $investment_id, int $year)
    {
        return $this->operationRepository->getYearOperationsSummary($investment_id, $year);
    }
}
