<?php

use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        'wallet/total-invested',
        [WalletController::class, 'getTotalInvested']
    )->name('wallet.total-invested');

    Route::get(
        'wallet/total-invested-per-type/{investmentType}',
        [WalletController::class, 'getTotalInvestedByInvestmentType']
    )->name('wallet.total-invested-by-type');

    Route::get(
        'wallet/{walletId}/investments',
        [WalletController::class, 'getWalletInvestments']
    )->name('wallet.investments');
});
