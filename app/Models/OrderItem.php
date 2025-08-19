<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'product_id', 'product_details', 'type', 'quantity', 'price', 'total', 'status', 'shipping'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }


    public function getProductDetailsAttribute($value)
    {
        return json_decode($value);
    }
}
