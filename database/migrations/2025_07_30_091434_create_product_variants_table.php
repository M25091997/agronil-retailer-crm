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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('unit_type_id')->nullable();
            $table->string('unit_type')->default('');
            $table->unsignedBigInteger('base_unit_id');
            $table->string('base_unit')->default('');
            $table->decimal('quantity', 8, 2)->default(0);
            $table->decimal('price', 8, 2)->default(0);
            $table->decimal('original_price', 8, 2)->default(0);
            $table->decimal('unit_rate', 8, 2)->default(0);
            $table->decimal('discount', 8, 2)->default(0)->nullable();
            $table->integer('stock')->default(0)->nullable();
            $table->boolean('is_bulk')->default(false);
            $table->boolean('is_active')->default(false);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
