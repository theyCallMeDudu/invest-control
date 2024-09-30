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

    // Gets the existing investment data
    public function edit(Request $request)
    {
        $investment = Investment::where('investment_id', $request->investment_id)->first();

        if (!$investment) {
            return response()->json(['message' => 'Investment not found'], 404);
        }

        // Returns the investment found as a JSON
        return response()->json($investment);
    }

    // Updates the existing investment on the database
    public function update(Request $request, int $investment_id)
    {
        $investment = Investment::find($investment_id);

        if (!$investment) {
            return response()->json(['message' => 'Investment not found', 404]);
        }

        $validateData = $request->validate([
            'investment_name'    => 'required|string|max:255',
            'investment_type_id' => 'required|integer|exists:investment_type,investment_type_id'
        ]);

        $investment->investment_name    = $validateData['investment_name'];
        $investment->investment_type_id = $validateData['investment_type_id'];

        $investment->save();

        return response()->json(['message' => 'Investment updated successfully', 'investment' => $investment], 200);
    }
}
