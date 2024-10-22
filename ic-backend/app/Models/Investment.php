<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $table = 'investment';
    protected $primaryKey = 'investment_id';
    protected $fillable = [
        'investment_type_id',
        'investment_name',
        'user_id'
    ];

    public function investmentType()
    {
        return $this->belongsTo(InvestmentType::class, 'investment_type_id', 'investment_type_id');
    }

    public function operations()
    {
        return $this->hasMany(Operation::class, 'investment_id', 'investment_id');
    }
}
