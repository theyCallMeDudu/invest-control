<?php

namespace App\Http\Services;

use App\Models\Investment;
use Illuminate\Support\Facades\Auth;

class InvestmentsService
{
    /**
     * Retorns all investments.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllInvestments()
    {
        // Filters investiments by authenticated user
        return Investment::with('investmentType')
        ->where('user_id', Auth::id())
        ->get();
    }
}
