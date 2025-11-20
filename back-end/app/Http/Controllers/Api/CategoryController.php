<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Mengembalikan semua kategori (id, name, slug)
        $categories = ProductCategory::select('id', 'name', 'slug')->get();
        return response()->json(['data' => $categories]);
    }
}