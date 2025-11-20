<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Pengunjung/Pembeli
            $table->integer('rating'); // Bintang (1-5)
            $table->text('comment'); // Tulisan review
            $table->string('province'); // Tambahan provinsi sesuai notes
            $table->timestamps();

            // Constraint: Satu user hanya boleh 1 review per produk
            $table->unique(['product_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};