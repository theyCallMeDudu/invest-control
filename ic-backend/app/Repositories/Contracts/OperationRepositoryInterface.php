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
}
