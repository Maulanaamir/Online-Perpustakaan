<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'category_id',
        'file_path',
        'cover_path', 
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
