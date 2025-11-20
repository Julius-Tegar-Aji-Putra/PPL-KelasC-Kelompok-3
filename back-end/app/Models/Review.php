<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'product_id', 
        'guest_name', 
        'guest_email', 
        'guest_phone', 
        'rating', 
        'comment', 
        'province'
    ];

    // Relasi ke User DIHAPUS karena pengisi adalah guest (tamu)
}