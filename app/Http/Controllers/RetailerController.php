<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Retailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RetailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function pendingRetailer()
    {
        return Inertia::render('Admin/Retailer/PendingRetailerList', [
            'retailers' => Retailer::with('user')->pendingRetailer()->get(),
        ]);
    }
    public function approvedRetailer()
    {
        return Inertia::render('Admin/Retailer/ApprovedRetailerList', [
            'retailers' => Retailer::with('user')->approvedRetailer()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function statusUpdate(Retailer $retailer)
    {
        $retailer->status = !$retailer->status;
        $retailer->save();

        $retailer->user->update([
            'status' => $retailer->status
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Retailer profile status updated successfully!'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|digits:6',
            'profile_picture' => 'nullable|image|max:2048',
            'shop_image' => 'nullable|image|max:2048',
            'registration_certificate' => 'nullable|file|max:2048',
            'pan_card' => 'nullable|file|max:2048',
            'aadhaar_card' => 'nullable|file|max:2048',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error('Validation failed', $validator->errors(), 422);
        }


        // Handle file uploads
        $data = $validator->validated();

        $uploadPath = 'uploads/retailers/';

        // foreach (['profile_picture', 'shop_image', 'registration_certificate', 'pan_card', 'aadhaar_card'] as $field) {
        //     if ($request->hasFile($field)) {
        //         $data[$field] = $request->file($field)->store($uploadPath, 'public');
        //     }
        // }

        foreach (['profile_picture', 'shop_image', 'registration_certificate', 'pan_card', 'aadhaar_card'] as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store($uploadPath, 'public');
                $data[$field] = Storage::url($path); // gives /storage/uploads/retailers/filename.jpg
            }
        }


        // Save retailer
        $retailer = Retailer::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'name' => $data['name'],
                'email' => $data['email'] ?? '',
                'address' => $data['address'],
                'city' => $data['city'],
                'state' => $data['state'],
                'pincode' => $data['pincode'],
                'profile_picture' => $data['profile_picture'] ?? '',
                'shop_image' => $data['shop_image'] ?? '',
                'registration_certificate' => $data['registration_certificate'] ?? '',
                'pan_card' => $data['pan_card'] ?? '',
                'addhar_card' => $data['addhar_card'] ?? '',
                'status' => 0,
            ]
        );

        return ApiResponse::success('Retailer saved successfully, Wait for approval', [
            'data' => $retailer,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Retailer $retailer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Retailer $retailer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Retailer $retailer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Retailer $retailer)
    {
        return response()->json([
            'status' => true,
            'message' => 'Retailer data deleted successfully!'
        ]);
    }
}
