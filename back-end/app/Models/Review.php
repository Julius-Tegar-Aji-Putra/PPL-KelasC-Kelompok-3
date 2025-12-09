<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'reviewer_name',
        'reviewer_email',
        'reviewer_phone',
        'province',
        'rating',
        'comment'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}