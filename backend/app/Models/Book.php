<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'title',
        'description',
        'published',
        'number_of_page',
        'isbn_code',
        'in_stock',
        'available',
        'language_id',
        'cover_type_id',
        'file_id',
        'is_new',
    ];
}
