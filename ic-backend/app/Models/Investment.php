<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $table    = 'investment';
    protected $fillable = [
        'investment_type_id',
        'investment_name'
    ];
}
