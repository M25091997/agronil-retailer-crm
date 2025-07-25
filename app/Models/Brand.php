<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Brand extends Model
{
    protected $fillable = ['name', 'slug', 'category_id', 'image', 'description', 'is_active', 'is_verified', 'user_id'];


    public function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $i = 1;

        while (Brand::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $i++;
        }

        return $slug;
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($brand) {
            $slug = Str::slug($brand->name);
            $originalSlug = $slug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $i++;
            }

            $brand->slug = $slug;
        });
    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
