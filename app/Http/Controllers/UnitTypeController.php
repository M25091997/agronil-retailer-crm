<?php

namespace App\Http\Controllers;

use App\Models\UnitType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unitTypes = UnitType::latest()->get();
        return Inertia::render('Admin/ProductUnit/UnitType', [
            'unitTypes' => $unitTypes
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
        $request->validate([
            'name' => 'required|string|max:50',
            'unit' => 'required|string|max:10',
            'is_active' => 'nullable',
        ]);

        $unitType = UnitType::create([
            'name' => $request->name,
            'unit' => $request->unit,
            'is_active' => $request->has('is_active') ? true : false,
        ]);

        return response()->json([
            'message' => 'Unit type created successfully.',
            'data' => $unitType, // return created data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UnitType $unitType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UnitType $unitType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UnitType $unitType)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'unit' => 'required|string|max:10',
            'is_active' => 'nullable',
        ]);

        $unitType->name = $request->name;
        $unitType->unit = $request->unit;
        $unitType->is_active = $request->has('is_active') ? true : false;

        $unitType->save();

        return response()->json([
            'message' => 'Unit type updated successfully.',
            'data' => $unitType, // return updated data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UnitType $unitType)
    {
        $unitType->delete();

        return response()->json(['message' => 'Unit Type deletd successfully!', 'status' => true]);
    }
}
