<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Semua Kategori',
            'Elektronik',
            'Gadget',
            'Fashion Pria',
            'Fashion Wanita',
            'Kecantikan & Perawatan',
            'Makanan & Minuman',
            'Otomotif',
            'Hobi & Koleksi',
            'Buku & ATK',
            'Gaming',
            'Kesehatan',
            'Olahraga',
            'Perabotan Rumah'
        ];

        foreach ($categories as $category) {
            ProductCategory::create([
                'name' => $category,
                'slug' => Str::slug($category), 
            ]);
        }
    }
}