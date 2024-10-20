<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;

    protected $table = 'operation';
    protected $primaryKey = 'operation_id';
    protected $fillable = [
        'investment_id',
        'currency_type_id',
        'operation_type_id',
        'operation_date',
        'operation_value',
        'quantity',
        'unit_price',
        'user_id'
    ];

    public function operationType()
    {
        return $this->belongsTo(OperationType::class, 'operation_type_id', 'operation_type_id');
    }

    public function investment()
    {
        return $this->belongsTo(Investment::class, 'investment_id', 'investment_id');
    }

    public function currencyType()
    {
        return $this->belongsTo(CurrencyType::class, 'currency_type_id', 'currency_type_id');
    }

}
