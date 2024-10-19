<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;

    protected $table = 'investment_operation';
    protected $primaryKey = 'investment_operation_id';
    protected $fillable = [
        'investment_id',
        'operation_type_id',
        'currency_type_id',
        'operation_date',
        'quantity',
        'unit_price',
        'operation_value',
        'user_id'
    ];
}
