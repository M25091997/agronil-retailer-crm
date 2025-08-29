<?php

namespace App\Http\Controllers;

use App\Models\RewardSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RewardSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Discount/RewardSetting', [
            'rewardSettings' => RewardSetting::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated =  $request->validate([
            'min_order_amount' => 'required|min:1',
            'points_per_amount' => 'required|min:1',
            'redeem_value' => 'required',
            'is_active' => 'nullable|boolean',
        ]);

        $setting =  RewardSetting::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Reward setting added successfully',
            'data' => $setting,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RewardSetting $rewardsetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RewardSetting $rewardsetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RewardSetting $rewardsetting)
    {
        $validated = $request->validate([
            'min_order_amount' => 'required|numeric|min:1',
            'points_per_amount' => 'required|numeric|min:1',
            'redeem_value' => 'required|numeric|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        // Ensure boolean
        $validated['is_active'] = $request->boolean('is_active');

        $rewardsetting->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Reward setting updated successfully',
            'data' => $rewardsetting,
        ]);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RewardSetting $rewardsetting)
    {
        $rewardsetting->delete();

        return response()->json([
            'status' => true,
            'message' => 'Reward setting deleted successfully',
        ]);
    }
}
