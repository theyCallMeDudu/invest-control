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
}
