<?php

namespace App\Http\Controllers;

use App\Http\Services\InvestmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
    public function index(Request $request)
    {
        try {
            // Records per page (default: 5)
            $perPage = $request->query('per_page', 5);

            // Current page (default: 1)
            $currentPage = $request->query('page', 1);

            // Fetch paginated investments or all investments based on query params
            if ($perPage !== 0 && $currentPage !== 0) {
                $investments = $this->investmentService->getPaginatedInvestments($currentPage, $perPage);
            } else {
                $investments = $this->getAllInvestments(); // Ensure this method is returning investments
            }

            // Return the investments as a JSON response
            return response()->json($investments, 200);

        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error fetching investments: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            // Return an error response with status 500
            return response()->json([
                'error' => 'An error occurred while fetching investments.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getAllInvestments()
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
        try {
            $investment = $this->investmentService->getInvestmentById($investment_id);

            if (!$investment) {
                return response()->json(['message' => 'Investment not found'], 404);
            }

            // Tries to delete the investment
            $this->investmentService->deleteInvestment($investment);

            return response()->json(['message' => 'Investment successfully deleted'], 200);

        } catch (\Exception $e) {
            // Returns the error message if the exception occurs
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function getAvailableInvestmentYears(int $investment_id)
{
    try {
        $investment = $this->investmentService->getInvestmentById($investment_id);

        if (!$investment) {
            return response()->json(['message' => 'Investment not found'], 404);
        }

        $availableYears = $this->investmentService->getAvailableInvestmentYears($investment_id);

        return response()->json(['availableYears' => $availableYears], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 400);
    }
}

    /**
     * Retrieves the operations associated with a specific investment.
     *
     * @param int $investment_id
     * @param int $year
     * @return \Illuminate\Http\JsonResponse
     */
    public function getYearInvestmentOperations(int $investment_id, int $year)
    {
        try {
            $investment = $this->investmentService->getInvestmentById($investment_id);

            if (!$investment) {
                return response()->json(['message' => 'Investment not found'], 404);
            }

            // Fetches operations related to the investment
            $summary = $this->investmentService->getYearOperationsSummary($investment_id, $year);

            // Returns operations with a success response
            return response()->json(['summary' => $summary], 200);
        } catch (\Exception $e) {
            // Returns the error message if an exception occurs
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

}
