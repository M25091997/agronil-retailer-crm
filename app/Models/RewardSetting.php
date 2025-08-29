<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RewardSetting extends Model
{
    protected $fillable = ['min_order_amount', 'points_per_amount', 'redeem_value', 'is_active'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
