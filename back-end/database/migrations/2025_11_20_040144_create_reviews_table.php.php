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
            
            $table->string('reviewer_name');  
            $table->string('reviewer_email'); 
            $table->string('reviewer_phone'); 
            $table->string('province');      
            
            $table->integer('rating'); 
            $table->text('comment');   
            $table->timestamps();

            $table->unique(['product_id', 'reviewer_email'], 'review_email_unique');
            
            $table->unique(['product_id', 'reviewer_phone'], 'review_phone_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};