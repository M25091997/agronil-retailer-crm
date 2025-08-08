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
        Schema::create('retailers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->string('email')->nullable()->default('');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('pincode');

            $table->string('profile_picture')->nullable()->default('');
            $table->string('shop_image')->nullable()->default('');
            $table->string('registration_certificate')->nullable()->default('');
            $table->string('pan_card')->nullable()->default('');
            $table->string('aadhaar_card')->nullable()->default('');

            $table->boolean('status')->default(false);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retailers');
    }
};
