<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use Illuminate\Http\Request;

class InvestmentController extends Controller
{
    public function store(Request $request)
    {
        // Validate received data
        $data = $request->validate([
            'investment_name'    => 'required|string|max:255',
            'investment_type_id' => 'required|integer|exists:investment_type,investment_type_id'
        ]);

        // Creates a new investment in database
        $investment = Investment::create([
            'investment_name'    => $data['investment_name'],
            'investment_type_id' => $data['investment_type_id']
        ]);

        // Returns the just created investment as a response
        return response()->json($investment, 201);
    }
}
