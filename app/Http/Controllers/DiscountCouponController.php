<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\DiscountCoupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscountCouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Discount/CouponList', [
            'coupons' => DiscountCoupon::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Discount/CouponForm', [
            'categories' => Category::WhereIsActive()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:discount_coupons,code',
            'discount_type' => 'required|in:flat,percentage',
            'amount' => 'required|numeric|min:1',
        ]);

        DiscountCoupon::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Discount coupon added successfully!'
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(DiscountCoupon $discountCoupon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DiscountCoupon $coupon)
    {
        return Inertia::render('Admin/Discount/CouponForm', [
            'categories' => Category::WhereIsActive()->get(),
            'coupon' => $coupon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiscountCoupon $coupon)
    {
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string|unique:discount_coupons,code,' . $coupon->id,
            'discount_type' => 'required|in:flat,percentage',
            'amount' => 'required|numeric|min:1',
        ]);

        $coupon->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Discount coupon updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiscountCoupon $coupon)
    {
        $coupon->delete();

        return response()->json([
            'status' => true,
            'message' => 'Discount coupon deleted successfully!'
        ]);
    }
}
