<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    protected $fillable = ['name', 'sku', 'slug', 'sort_description', 'category_id', 'category', 'sub_category_id', 'sub_category', 'child_category_id', 'child_category', 'brand_id', 'brand', 'disease_id', 'disease', 'tags', 'description', 'specification', 'other_information', 'unit_type_id', 'unit_type', 'base_unit', 'is_active', 'top_selling', 'trending', 'featured', 'new_arrival', 'user_id', 'is_sale', 'thumnail_image', 'is_verified'];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $slug = Str::slug($product->name);
            $originalSlug = $slug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $i++;
            }

            $product->slug = $slug;

            // Set user_id from currently authenticated user
            if (empty($product->user_id) && Auth::check()) {
                $product->user_id = Auth::id();
            }
        });
    }

    public function scopeWhereIsActive($query)
    {
        return $query->where('is_active', true);
    }



    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    // public static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($product) {
    //         // Generate slug if not set
    //         if (empty($product->slug)) {
    //             $product->slug = Str::slug($product->name) . '-' . uniqid();
    //         }

    //         // Set user_id from currently authenticated user
    //         if (empty($product->user_id) && Auth::check()) {
    //             $product->user_id = Auth::id();
    //         }
    //     });

    //     static::updating(function ($product) {
    //         // Optionally update slug if name changes
    //         if ($product->isDirty('name')) {
    //             $product->slug = Str::slug($product->name) . '-' . uniqid();
    //         }
    //     });
    // }
}
