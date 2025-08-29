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
        Schema::create('reward_settings', function (Blueprint $table) {
            $table->id();
            $table->decimal('min_order_amount', 10, 2)->default(0); // Minimum order value to earn points
            $table->decimal('points_per_amount', 10, 2)->default(0); // e.g. 1 point for every 100 spent
            $table->decimal('redeem_value', 10, 2)->default(0); // e.g. 1 point = 1 INR
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reward_settings');
    }
};
