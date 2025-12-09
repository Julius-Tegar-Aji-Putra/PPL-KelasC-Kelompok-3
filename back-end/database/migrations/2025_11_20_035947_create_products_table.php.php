<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->foreignId('category_id')->constrained('product_categories');
            $table->string('name');
            $table->bigInteger('price'); 
            $table->string('brand'); 
            $table->enum('warranty_type', ['Garansi Resmi', 'Garansi Toko', 'Garansi Distributor', 'Tidak Ada Garansi']); 
            $table->enum('condition', ['Baru', 'Bekas']); 
            $table->integer('stock');
            $table->text('description');
            $table->string('main_image'); 
            $table->integer('total_sold')->default(0); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};