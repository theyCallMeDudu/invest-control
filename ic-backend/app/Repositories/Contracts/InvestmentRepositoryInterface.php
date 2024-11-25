<?php

namespace App\Repositories\Contracts;

use App\Models\Investment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface InvestmentRepositoryInterface
{
    /**
     * Returns a paginated list of all investments.
     * Results are paginated based on the specified page and number of items per page.
     *
     * @param  int  $page     The current page number for pagination.
     * @param  int  $perPage  The number of items to display per page.
     * @return LengthAwarePaginator  The paginated list of operations.
     */
    public function getAllInvestments(int $currentPage, int $perPage): LengthAwarePaginator;

    /**
     * Creates a new investment at the database.
     *
     * @param  array  $data
     * @return Investment
     */
    public function createInvestment(array $data);

    /**
     * Finds an investment by its ID.
     *
     * @param  int  $investmentId
     * @return Investment|null
     */
    public function findInvestmentById(int $investmentId);

    /**
     * Updates an existing investment.
     *
     * @param  Investment  $investment
     * @param  array  $data
     * @return Investment
     */
    public function updateInvestment(Investment $investment, array $data);

    /**
     * Deletes an investment.
     *
     * @param  Investment  $investment
     * @return bool|null
     */
    public function deleteInvestment(Investment $investment);


    public function getAvailableInvestmentYears(int $investment_id): array;
}
