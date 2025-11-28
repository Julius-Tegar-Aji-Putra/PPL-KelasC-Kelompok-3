<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::select('id', 'name', 'slug')
            ->orderByRaw("CASE WHEN slug = 'semua-kategori' THEN 0 ELSE 1 END")
            ->orderBy('name', 'asc') 
            ->get();
            
        return response()->json(['data' => $categories]);
    }
}
