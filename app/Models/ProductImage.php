<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    protected $fillable = ['product_id', 'image_path', 'is_active'];

    public function getImagePathAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
}
