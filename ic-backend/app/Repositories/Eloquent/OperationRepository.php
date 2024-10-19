<?php

namespace App\Repositories\Eloquent;

use App\Models\Operation;
use App\Repositories\Contracts\OperationRepositoryInterface;

class OperationRepository implements OperationRepositoryInterface
{
    protected $model;

    public function __construct(Operation $model)
    {
        $this->model = $model;
    }

    public function createOperation(array $data)
    {
        return $this->model->create($data);
    }
}
