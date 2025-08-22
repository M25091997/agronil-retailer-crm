<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'invoice_no', 'status', 'shipping_address', 'discount_type', 'coupon_code', 'amount', 'discount', 'shipping_charge', 'tax', 'gst_type', 'gst_amount', 'total_amount', 'paid_amount', 'due_amount', 'payment_status', 'notes'];

    public function getShippingAddressAttribute($value)
    {
        return json_decode($value);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function payments()
    {
        return $this->hasMany(OrderPayment::class, 'order_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select(['id', 'name', 'email', 'phone']);
    }
}
