<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderPayment extends Model
{
    protected $fillable = ['order_id', 'transaction_no', 'payment_method', 'payment_type', 'amount', 'payment_slip', 'status', 'verified_name'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
