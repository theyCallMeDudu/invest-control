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
}
