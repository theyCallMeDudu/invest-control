<?php

use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('wallet/total-invested', [WalletController::class, 'getTotalInvested']);
});
