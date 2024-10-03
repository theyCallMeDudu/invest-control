<?php

namespace App\Http\Services;

use App\Models\Investment;

class InvestmentsService
{
    /**
     * Retorns all investments.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllInvestments()
    {
        return Investment::with('investmentType')->get();
    }
}
