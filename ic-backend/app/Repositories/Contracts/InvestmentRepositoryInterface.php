<?php

namespace App\Repositories\Contracts;

use App\Models\Investment;

interface InvestmentRepositoryInterface
{
    /**
     * Returns all investments from the authenticated user.
     *
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllInvestments(int $userId);

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
}
