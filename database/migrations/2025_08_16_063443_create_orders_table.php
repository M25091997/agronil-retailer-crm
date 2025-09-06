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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('invoice_no')->nullable();
            $table->enum('status', ['Pending', 'Placed', 'Cancelled'])->default('Pending');
            $table->text('shipping_address')->nullable();

            $table->enum('discount_type', ['Coupon Code', 'Redeem Points', 'Other', 'Both'])->nullable();
            $table->string('coupon_code')->nullable();

            $table->decimal('amount', 12, 2);           // Subtotal
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('redeem', 8, 2)->default(0);
            $table->decimal('shipping_charge', 12, 2)->default(0);
            $table->decimal('tax', 12, 2)->default(0);
            $table->string('gst_type')->nullable();     // Instead of decimal
            $table->decimal('gst_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);     // Final amount after discounts + tax
            $table->decimal('paid_amount', 12, 2)->default(0);
            $table->decimal('due_amount', 12, 2)->default(0);

            $table->enum('payment_status', ['Pending', 'Partial', 'Paid'])->default('Pending');
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
