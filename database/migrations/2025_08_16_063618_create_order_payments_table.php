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
        Schema::create('order_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('transaction_no')->nullable();
            $table->string('payment_method'); // UPI, Card, COD, Bank, etc.
            $table->string('payment_type')->nullable(); // Advance / Remaining / Full
            $table->decimal('amount', 12, 2);
            $table->string('payment_slip')->nullable(); // proof image
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->string('verified_name')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_payments');
    }
};
