<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|digits:10',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $phone = $request->input('phone');

        $user = User::firstOrCreate(
            ['phone' => $phone],
            ['name' => '', 'email' => '', 'password' => Hash::make($phone), 'referral_code' =>  $phone]
        );

        // Generate & save OTP + expiry
        $otp = rand(100000, 999999);
        $user->update([
            'otp'            => $otp,
            'otp_expire_at'  => Carbon::now()->addMinutes(10),
        ]);

        // TODO: dispatch SMS job here

        return ApiResponse::success(
            'OTP sent successfully.',
            [
                'otp' => $otp,
                'phone_masked' => substr($phone, 0, 2) . '******' . substr($phone, -2),
            ]
        );
    }

    public function otp_verify(Request $request)
    {
        $request->merge([
            'phone' => (string) $request->phone,
        ]);

        $validator = Validator::make($request->all(), [
            'phone' => 'required|digits:10|exists:users,phone',
            'otp'   => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }

        $user = User::where('phone', $request->phone)->first();

        // Check OTP match and expiry
        if ((int) $user->otp !== (int) $request->otp) {
            return ApiResponse::error('Invalid OTP.', [], 422);
        }

        if (Carbon::now()->greaterThan($user->otp_expire_at)) {
            return ApiResponse::error('OTP has expired.', [], 422);
        }

        $user->update([
            'verified'       => true,
            'otp'            => null,
            'otp_expire_at'  => null,
            'phone_verified_at' => Carbon::now(),
        ]);

        $token = $user->createToken('authToken')->accessToken;

        $user->load('retailer');
        return ApiResponse::success('Login successful.', [
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function profile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return ApiResponse::error('User is not authenticated.', 401);
        }

        $user->load('retailer');
        return ApiResponse::success('User Profile.', [
            'user'  => $user,
        ]);
    }
}
