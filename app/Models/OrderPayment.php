<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OrderPayment extends Model
{
    protected $fillable = ['order_id', 'transaction_no', 'payment_method', 'payment_type', 'amount', 'payment_slip', 'status', 'verified_name'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function getPaymentSlipAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
}
