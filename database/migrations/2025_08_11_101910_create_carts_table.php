<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();

            // Relationships
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_variant_id');
            $table->unsignedBigInteger('product_bulk_price_id')->nullable();
            $table->unsignedBigInteger('user_id');

            // Cart details
            $table->unsignedInteger('quantity');
            $table->enum('type', ['cart', 'buy_now'])->default('cart');
            $table->boolean('status')->default(false);
            $table->timestamps();

            // Foreign keys
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');

            $table->foreign('product_variant_id')
                ->references('id')->on('product_variants')
                ->onDelete('cascade');

            $table->foreign('product_bulk_price_id')
                ->references('id')->on('product_bulk_prices')
                ->onDelete('set null');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
