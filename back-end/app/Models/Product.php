<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // Relasi ke Penjual
    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi ke Kategori
    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    // Relasi ke Gambar Tambahan
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    // Relasi ke Review
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}