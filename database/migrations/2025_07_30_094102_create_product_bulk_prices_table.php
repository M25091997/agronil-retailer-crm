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
        Schema::create('product_bulk_prices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_variant_id');
            $table->unsignedBigInteger('product_id')->nullable();

            $table->string('pieces_per_box')->nullable();
            $table->string('bulk_qty_range')->nullable();
            $table->decimal('bulk_price', 10, 2)->default(0);
            $table->decimal('total_box_price', 10, 2)->default(0);
            $table->decimal('margin', 5, 2)->default(0);
            $table->integer('bulk_stock')->default(0);
            $table->boolean('best_value')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('product_variant_id')->references('id')->on('product_variants')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_bulk_prices');
    }
};
