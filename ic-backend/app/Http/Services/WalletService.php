<?php

namespace App\Http\Services;

use App\Models\OperationType;
use App\Models\User;
use App\Models\Wallet;
use App\Repositories\Contracts\WalletInvestmentRepositoryInterface;
use App\Repositories\Contracts\WalletRepositoryInterface;
use App\Repositories\Eloquent\OperationRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Eloquent\WalletInvestmentRepository;
use App\Repositories\Eloquent\WalletRepository;
use Illuminate\Support\Facades\App;
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

    public function getTotalInvested(int $userId)
    {
        /** @var OperationRepository $operationRepository */
        $operationRepository = App::make(OperationRepository::class);

        // Get the total amount invested in purchases by the user
        $totalPurchase = $operationRepository->getTotalInvestedByOperationType($userId, OperationType::PURCHASE);

        // Get the total amount from sales by the user
        $totalSell = $operationRepository->getTotalInvestedByOperationType($userId, OperationType::SELL);

        // Ensure the total invested cannot be negative:
        // - If the total sales exceed the total purchases, this means the user has sold everything,
        //   and thus, their total investment should be zero, not negative.
        // - Use `max` to return the higher value between the calculated difference and zero.
        return max($totalPurchase - $totalSell, 0);
    }


}
