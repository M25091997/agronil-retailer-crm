<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\Contracts\OAuthenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'otp',
        'pincode',
        'otp_expire_at',
        'verified',
        'phone_verified_at',
        'email_verified_at',
        'password',
        'profile_picture',
        'avatar',
        'fcm_token',
        'google_id',
        'latitude',
        'longitude',
        'city',
        'referral_code',
        'status',
        'role',
        'remember_token',
        'reward_points',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function retailer()
    {
        return $this->hasOne(Retailer::class);
    }



    public function shippingAddress()
    {
        return $this->hasMany(ShippingAddress::class, 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id')
            ->select([
                'id',
                'user_id',
                'status',
                'invoice_no',
                'shipping_address',
                'total_amount',
                'paid_amount',
                'due_amount',
                'payment_status',
                'created_at'
            ]);
    }

    public function orderDetails()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class, 'user_id');
    }

    public function recentViews()
    {
        return $this->hasMany(RecentView::class, 'user_id')->latest('updated_at')
            ->limit(10);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
