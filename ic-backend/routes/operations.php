<?php

use App\Http\Controllers\OperationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Defines the operations routes
    Route::get('/operations', [OperationController::class, 'index']);

    // Defines the operation routes
    Route::post('/operations', [OperationController::class, 'store']);

    // Gets an existing operation by its ID
    Route::get('/operations/{operation_id}', [OperationController::class, 'edit']);

    // Updates an existing operation by its ID
    Route::put('/operations/{operation_id}', [OperationController::class, 'update']);

    // Deletes an existing operation by its ID
    Route::delete('/operations/{operation_id}', [OperationController::class, 'destroy']);
});
