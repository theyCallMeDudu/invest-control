<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Wallet;
use App\Repositories\Contracts\WalletInvestmentRepositoryInterface;
use App\Repositories\Contracts\WalletRepositoryInterface;
use App\Repositories\Eloquent\WalletInvestmentRepository;
use Illuminate\Support\Facades\Auth;

class WalletService
{
    protected $walletRepository;
    protected $walletInvestmentRepository;

    public function __construct(
        WalletRepositoryInterface $walletRepository,
        WalletInvestmentRepository $walletInvestmentRepository)
    {
        $this->walletRepository = $walletRepository;
        $this->walletInvestmentRepository = $walletInvestmentRepository;
    }

    public function checkUserWallet(User $user): bool
    {
        return $user->wallet()->exists();
    }

    public function createWallet(User $user): void
    {
        $this->walletRepository->createWallet($user);
    }

    public function getWallet(User $user): ?Wallet
    {
        return $this->walletRepository->getWallet($user);
    }

    public function addToWallet(array $data): void
    {
        $user = Auth::user();
        $wallet = $user->wallet;

        // Checks if already have the investment in th wallet
        $walletInvestment = $this->walletInvestmentRepository->isInvestmentInWallet($wallet->wallet_id, $data['investment_id']);

        if (is_null($walletInvestment)) {
            $this->walletInvestmentRepository->createWalletInvestment($wallet->wallet_id, $data);
        }
    }

    public function removeFromWallet(int $investmentId): void
    {
        $user = Auth::user();
        $wallet = $user->wallet;

        // Checks if already have the investment in th wallet
        $walletInvestment = $this->walletInvestmentRepository->isInvestmentInWallet($wallet->wallet_id, $investmentId);

        if ($walletInvestment) {
            $walletInvestment->delete();
        }
    }
}
