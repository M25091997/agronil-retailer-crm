<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RewardHistory extends Model
{
    protected $fillable = ['user_id', 'order_id', 'points', 'type', 'amount', 'description'];
}
