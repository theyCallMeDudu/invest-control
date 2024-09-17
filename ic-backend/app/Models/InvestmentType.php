<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestmentType extends Model
{
    use HasFactory;

    protected $table    = 'investment_type';
    public $timestamps  = false;
    protected $fillable = ['name'];
}
