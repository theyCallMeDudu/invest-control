<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\InvestmentRepositoryInterface;
use App\Repositories\Contracts\OperationRepositoryInterface;
use App\Repositories\Contracts\WalletRepositoryInterface;
use App\Repositories\Eloquent\InvestmentRepository;
use App\Repositories\Eloquent\OperationRepository;
use App\Repositories\Eloquent\WalletRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(InvestmentRepositoryInterface::class, InvestmentRepository::class);
        $this->app->bind(OperationRepositoryInterface::class, OperationRepository::class);
        $this->app->bind(WalletRepositoryInterface::class, WalletRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
