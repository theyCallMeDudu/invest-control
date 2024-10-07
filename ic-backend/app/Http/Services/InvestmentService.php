<?php

namespace App\Http\Services;

use App\Models\Investment;
use Illuminate\Support\Facades\Auth;

class InvestmentService
{
    /**
     * Creates a new investment.
     *
     * @param  array  $data
     * @return Investment
     */
    public function createInvestment(array $data)
    {
        // Creates a new investment in database
        return Investment::create([
            'investment_name'    => $data['investment_name'],
            'investment_type_id' => $data['investment_type_id'],
            'user_id'            => Auth::user()->id
        ]);
    }

    /**
     * Returns an investment by its ID.
     *
     * @param  int  $investment_id
     * @return Investment|null
     */
    public function getInvestmentById(int $investment_id)
    {
        return Investment::with('investmentType')->find($investment_id);
    }

    /**
     * Updates an existing investment in the database.
     *
     * @param  Investment  $investment
     * @param  array  $data
     * @return Investment
     */
    public function updateInvestment(Investment $investment, array $data)
    {
        $investment->update($data);
        return $investment;
    }

    /**
     * Deletes an investment from the database by its ID.
     *
     * @param  Investment  $investment
     * @return bool|null
     */
    public function deleteInvestment(Investment $investment)
    {
        return $investment->delete();
    }
}
