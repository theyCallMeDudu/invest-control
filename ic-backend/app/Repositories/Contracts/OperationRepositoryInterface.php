<?php

namespace App\Repositories\Contracts;

use App\Models\Operation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface OperationRepositoryInterface
{
    /**
     * Creates a new operation at the database.
     *
     * @param  array  $data
     * @return Operation
     */
    public function createOperation(array $data);

    /**
     * Retrieve a paginated list of operations for a specific user.
     *
     * This method fetches operations associated with a given user ID and includes
     * related models for operation type, currency type, and investment.
     * Results are paginated based on the specified page and number of items per page.
     *
     * @param  int  $userId   The ID of the user whose operations are being retrieved.
     * @param  int  $page     The current page number for pagination.
     * @param  int  $perPage  The number of items to display per page.
     * @return LengthAwarePaginator  The paginated list of operations.
     */
    public function getAllOperations(int $userId, int $page, int $perPage): LengthAwarePaginator;

    /**
     * Finds an operation by its ID.
     *
     * @param  int  $operationId
     * @return Operation|null
     */
    public function findOperationById(int $userId, int $operationId): Operation;

    /**
     * Updates an existing operation.
     *
     * @param  Operation  $operation
     * @param  array  $data
     * @return Operation
     */
    public function updateOperation(Operation $operation, array $data);

    /**
     * Deletes an operation.
     *
     * @param  Operation  $operation
     * @return bool|null
     */
    public function deleteOperation(Operation $operation): bool;

    /**
     * Retrieves a summary of operations for a specific investment over a given year, grouped by month.
     *
     * The summary includes total quantity, average unit price, and total value for each month.
     * For months without operations, the values are set to zero.
     *
     * @param int $investmentId The ID of the investment to retrieve the summary for.
     * @param int $year The year to filter operations by.
     *
     * @return array An array with 12 entries, each containing:
     *               - 'month': (int) The month number (1-12).
     *               - 'total_quantity': (float|int) Total quantity of units for the month.
     *               - 'average_price': (float|int) Average price per unit, rounded to 2 decimal places.
     *               - 'monthly_total': (float|int) Total value for the month, rounded to 2 decimal places.
     */
    public function getYearOperationsSummary(int $investmentId, int $year): array;

    public function calculateTotalQuantity(int $investmentId, int $userId): int;
}
