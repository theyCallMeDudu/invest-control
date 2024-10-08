<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use App\Http\Services\InvestmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvestmentController extends Controller
{
    protected $investmentService;

    // Injects InvestmentService in this Controller
    public function __construct(InvestmentService $investmentService)
    {
        $this->investmentService = $investmentService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $investments = $this->investmentService->getAllInvestments();
        return response()->json($investments);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate received data
        $data = $request->validate([
            'investment_name'    => 'required|string|max:255',
            'investment_type_id' => 'required|integer|exists:investment_type,investment_type_id'
        ]);

        $investment = $this->investmentService->createInvestment($data);

        // Returns the just created investment as a response
        return response()->json($investment, 201);
    }

    /**
     * @param  int  $investment_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(int $investment_id)
    {
        $investment = $this->investmentService->getInvestmentById($investment_id);

        if (!$investment) {
            return response()->json(['message' => 'Investment not found'], 404);
        }

        return response()->json($investment);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $investment_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $investment_id)
    {
        $data = $request->validate([
            'investment_name' => 'required|string|max:255',
            'investment_type_id' => 'required|exists:investment_type,investment_type_id',
        ]);

        $investment = $this->investmentService->getInvestmentById($investment_id);

        if (!$investment) {
            return response()->json(['message' => 'Investment not found'], 404);
        }

        $investment = $this->investmentService->updateInvestment($investment, $data);
        return response()->json(['message' => 'Investment successfully updated', 'investment' => $investment]);
    }

    /**
     * @param  int  $investment_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $investment_id)
    {
        $investment = $this->investmentService->getInvestmentById($investment_id);

        if (!$investment) {
            return response()->json(['message' => 'Investment not found'], 404);
        }

        $this->investmentService->deleteInvestment($investment);
        return response()->json(['message' => 'Investment successfully deleted'], 200);
    }
}
