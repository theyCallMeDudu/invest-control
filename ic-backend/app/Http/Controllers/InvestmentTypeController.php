<?php

namespace App\Http\Controllers;

use App\Models\InvestmentType;
use Illuminate\Http\Request;

class InvestmentTypeController extends Controller
{
    public function index()
    {
        $investmentTypes = InvestmentType::all();
        return response()->json($investmentTypes);
    }
}
