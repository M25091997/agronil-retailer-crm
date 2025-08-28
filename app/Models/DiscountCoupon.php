<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscountCoupon extends Model
{
    protected $fillable = ['name', 'title', 'code', 'amount', 'discount_type', 'is_all', 'user_id', 'discount_on', 'is_minimum', 'order_value', 'is_expiry', 'expiry_date', 'is_limit', 'limit', 'usage_limit', 'used_count', 'is_active'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
