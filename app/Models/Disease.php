<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Disease extends Model
{
    protected $fillable = ['name', 'slug', 'category_id', 'image', 'description', 'is_active', 'is_verified', 'user_id'];


    public function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $i = 1;

        while (Disease::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $i++;
        }

        return $slug;
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $slug = Str::slug($item->name);
            $originalSlug = $slug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $i++;
            }

            $item->slug = $slug;
        });
    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function scopeWhereIsActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getImageAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
}
