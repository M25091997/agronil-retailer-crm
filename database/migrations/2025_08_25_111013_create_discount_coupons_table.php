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
            $table->boolean('is_minimun')->default(false);
            $table->decimal('order_value', 10, 2);
            $table->boolean('is_expiry')->default(false);
            $table->date('expiry_date');
            $table->boolean('is_limit')->default(false);
            $table->string('limit')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps();
            $table->softDeletes();
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
