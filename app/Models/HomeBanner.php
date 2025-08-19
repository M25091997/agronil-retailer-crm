<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HomeBanner extends Model
{
    protected $fillable = ['category_id', 'title', 'btn_txt', 'url', 'image', 'description', 'is_active', 'is_verified', 'user_id'];

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
