<?php

namespace App\Repositories\Contracts;

use App\Models\Operation;
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
     * Returns all operations from the authenticated user.
     *
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllOperations(int $userId);

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
