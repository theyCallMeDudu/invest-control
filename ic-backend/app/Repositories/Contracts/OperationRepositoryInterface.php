<?php

namespace App\Repositories\Contracts;

use App\Models\Operation;

interface OperationRepositoryInterface
{
    /**
     * Creates a new operation at the database.
     *
     * @param  array  $data
     * @return Operation
     */
    public function createOperation(array $data);
}
