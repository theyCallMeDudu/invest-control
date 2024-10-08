<?php

namespace App\Repositories\Contracts;

use App\Models\Investment;

interface InvestmentRepositoryInterface
{
    /**
     * Retorna todos os investimentos do usuário autenticado.
     *
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllInvestments(int $userId);

    /**
     * Cria um novo investimento no banco de dados.
     *
     * @param  array  $data
     * @return Investment
     */
    public function createInvestment(array $data);

    /**
     * Encontra um investimento pelo seu ID.
     *
     * @param  int  $investmentId
     * @return Investment|null
     */
    public function findInvestmentById(int $investmentId);

    /**
     * Atualiza um investimento existente no banco de dados.
     *
     * @param  Investment  $investment
     * @param  array  $data
     * @return Investment
     */
    public function updateInvestment(Investment $investment, array $data);

    /**
     * Exclui um investimento do banco de dados.
     *
     * @param  Investment  $investment
     * @return bool|null
     */
    public function deleteInvestment(Investment $investment);
}
