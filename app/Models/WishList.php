<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
    protected $fillable = ['product_id', 'type', 'user_id'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id')->where('is_active', true);
    }
}
