<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'sender_id',
        'type',
        'title',
        'message',
        'notifiable_id',
        'notifiable_type',
        'is_read',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
        'is_read' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function notifiable()
    {
        return $this->morphTo();
    }
}
