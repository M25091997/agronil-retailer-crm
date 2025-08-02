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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku');
            $table->string('slug')->unique();
            $table->text('sort_description')->nullable()->default('');
            $table->unsignedBigInteger('category_id');
            $table->string('category');
            $table->unsignedBigInteger('sub_category_id')->nullable();
            $table->string('sub_category')->nullable()->default('');
            $table->unsignedBigInteger('child_category_id')->nullable();
            $table->string('child_category')->nullable()->default('');
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->string('brand')->nullable()->default('');
            $table->unsignedBigInteger('disease_id')->nullable();
            $table->string('disease')->nullable()->default('');
            $table->string('tags')->nullable()->default('');
            $table->longText('description');
            $table->longText('specification')->nullable()->default('');
            $table->longText('other_information')->nullable()->default('');
            $table->unsignedBigInteger('unit_type_id')->nullable();
            $table->string('unit_type')->nullable()->default('');
            $table->string('base_unit')->nullable()->default('');
            $table->string('hsn_code')->nullable()->default('');
            $table->boolean('is_active')->default(false);
            $table->boolean('top_selling')->default(false);
            $table->boolean('trending')->default(false);
            $table->boolean('featured')->default(false);
            $table->boolean('new_arrival')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->boolean('is_sale')->default(false);
            $table->string('thumnail_image')->nullable()->default('');
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            $table->softDeletes();

            // Foreign Key Constraints
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->onDelete('set null');
            // $table->foreign('child_category_id')->references('id')->on('child_categories')->onDelete('set null');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            $table->foreign('disease_id')->references('id')->on('diseases')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
