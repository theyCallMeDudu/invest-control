<?php

namespace App\Repositories\Eloquent;

use App\Models\Wallet;
use App\Models\User;
use App\Repositories\Contracts\WalletRepositoryInterface;

class WalletRepository implements WalletRepositoryInterface
{
    protected $model;

    public function __construct(Wallet $wallet)
    {
        $this->model = $wallet;
    }

    public function createWallet(User $user): void
    {
        $this->model->create([
            'user_id' => $user->id
        ]);
    }
}
