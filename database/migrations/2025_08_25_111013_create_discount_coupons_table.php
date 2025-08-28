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
        Schema::create('discount_coupons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('code')->unique();
            $table->decimal('amount', 10, 2);
            $table->enum('discount_type', ['flat', 'percentage']);
            $table->boolean('is_all')->default(true);
            $table->string('user_id')->nullable();
            $table->enum('discount_on', ['varient', 'bulk', 'all'])->nullable();
            $table->boolean('is_minimum')->default(false);
            $table->decimal('order_value', 10, 2)->nullable();
            $table->boolean('is_expiry')->default(false);
            $table->date('expiry_date')->nullable();
            $table->boolean('is_limit')->default(false);
            $table->string('limit')->nullable();
            $table->integer('usage_limit')->nullable();   // total uses
            $table->integer('used_count')->default(0);   // how many times coupon used
            $table->boolean('is_category')->default(false);
            $table->unsignedBigInteger('category_id')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_coupons');
    }
};
