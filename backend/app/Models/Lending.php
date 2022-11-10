<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lending extends Model
{
    use HasFactory;

    protected $table = 'lendings';

    protected $fillable = [
        'user_id',
        'shipping_token',
        'is_active',
        'created_by',
        'updated_by',
    ];
}
