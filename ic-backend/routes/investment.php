<?php

use App\Http\Controllers\InvestmentController;
use Illuminate\Support\Facades\Route;

// Define as rotas relacionadas a Investment Types
Route::post('/investment', [InvestmentController::class, 'store']);
