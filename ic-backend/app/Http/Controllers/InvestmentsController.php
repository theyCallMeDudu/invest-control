<?php

namespace App\Http\Controllers;

use App\Models\Investment;

class InvestmentsController extends Controller
{
    public function index()
    {
        $investments = Investment::with('investmentType')->get();
        return response()->json($investments);
    }
}
