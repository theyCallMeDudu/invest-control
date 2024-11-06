<?php

namespace App\Repositories\Contracts;

use App\Models\User;

interface WalletRepositoryInterface
{
    public function createWallet(User $user, array $data): void;
}
