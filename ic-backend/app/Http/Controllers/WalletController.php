<?php

namespace App\Http\Controllers;

use App\Http\Services\WalletService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function getTotalInvested(Request $request)
    {
        $userId = Auth::user()->id;
        $totalInvested = $this->walletService->getTotalInvested($userId);
        return response()->json(['total_invested' => $totalInvested]);
    }

    public function getTotalInvestedByInvestmentType(int $investmentType)
    {
        $userId = Auth::user()->id;
        $totalInvestedByType = $this
            ->walletService
            ->getTotalInvestedByInvestmentType(
                $userId,
                $investmentType
            );
        return response()->json(['total_invested' => $totalInvestedByType]);
    }

    public function getWalletInvestments(int $walletId)
    {
        $walletInvestments = $this
            ->walletService
            ->getWalletInvestments($walletId);
        return response()->json([$walletInvestments]);
    }
}
