<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestmentType extends Model
{
    use HasFactory;

    protected $table    = 'investment_type';
    protected $primaryKey = 'investment_type_id';
    protected $fillable = ['investment_type_name'];
}
