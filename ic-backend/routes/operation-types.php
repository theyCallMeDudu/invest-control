<?php

use App\Http\Controllers\OperationTypeController;
use Illuminate\Support\Facades\Route;

Route::get('/operation-types', [OperationTypeController::class, 'index']);
