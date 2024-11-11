<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationType extends Model
{
    use HasFactory;

    protected $table    = 'operation_type';
    protected $primaryKey = 'operation_type_id';
    protected $fillable = ['operation_type_name'];

    const PURCHASE = 1;
    const SELL     = 2;
}
