<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    protected $fillable = ['user_id', 'address_type', 'full_name', 'phone', 'alternate_phone', 'address_line1', 'address_line2', 'city', 'state', 'country', 'postal_code', 'is_default'];
}
