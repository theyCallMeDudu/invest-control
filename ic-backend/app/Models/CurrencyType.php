<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyType extends Model
{
    use HasFactory;

    protected $table    = 'currency_type';
    protected $primaryKey = 'currency_type_id';
    protected $fillable = [
        'currency_type_code',
        'currency_type_symbol',
        'currency_type_name'
    ];
}
