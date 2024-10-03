<?php

namespace App\Http\Controllers;

use App\Http\Services\InvestmentsService;
use App\Models\Investment;

class InvestmentsController extends Controller
{
    protected $investmentsService;

    // Injects InvestmentsService in this Controller
    public function __construct(InvestmentsService $investmentsService)
    {
        $this->investmentsService = $investmentsService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $investments = $this->investmentsService->getAllInvestments();
        return response()->json($investments);
    }
}
