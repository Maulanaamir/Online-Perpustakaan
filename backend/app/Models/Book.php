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
        'file_path',
        'cover_path',
    ];

    // Relasi ke banyak kategori
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_category');
    }

    // Relasi ke semua peminjaman buku ini
    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }
}