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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relasi ke Penjual
            $table->foreignId('category_id')->constrained('product_categories');
            $table->string('name');
            $table->bigInteger('price'); // Harga
            $table->string('brand'); // Merek
            $table->string('warranty_type'); // Tipe Garansi
            $table->enum('condition', ['baru', 'bekas']); // Kondisi barang
            $table->integer('stock');
            $table->text('description');
            $table->string('main_image'); // 1 gambar untuk tampilan list
            $table->integer('total_sold')->default(0); // Placeholder akumulasi sistem
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};