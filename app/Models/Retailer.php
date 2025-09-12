<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Retailer extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'address', 'city', 'state', 'pincode', 'profile_picture', 'shop_image', 'registration_certificate', 'pan_card', 'aadhaar_card', 'status'];

    public function scopePendingRetailer($query)
    {
        return $query->where('status', false);
    }
    public function scopeApprovedRetailer($query)
    {
        return $query->where('status', true);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getProfilePictureAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }

    public function getShopImageAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }

    public function getRegistrationCertificateAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
    public function getPanCardAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
    public function getAadhaarCardAttribute($value)
    {
        return $value ? Storage::disk('public')->url($value) : '';
    }
}
