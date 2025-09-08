<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'image', 'description', 'is_active', 'is_verified', 'user_id'];


    public function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $i = 1;

        while (Category::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $i++;
        }

        return $slug;
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            $slug = Str::slug($category->name);
            $originalSlug = $slug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $i++;
            }

            $category->slug = $slug;
        });
    }

    public function scopeWhereIsActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function getImageAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
}
