<?php

namespace App\Http\Controllers;

use App\Models\BaseUnit;
use App\Models\UnitType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BaseUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/ProductUnit/BaseUnit', [
            'baseUnits' => BaseUnit::with("unitType")->latest()->get(),
            'unitTypes' => UnitType::whereIsActive()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'base_unit' => 'required|string|max:10',
            'unit_type_id' => 'required|exists:unit_types,id',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 422);
        }

        $data = $validate->validated();
        $data['is_active'] = $request->has('is_active') ? (bool)$request->is_active : false;

        $baseUnit = BaseUnit::create($data);

        // Load the related unitType
        $baseUnit->load('unitType');

        return response()->json([
            'message' => 'Base Unit added successfully',
            'data' => $baseUnit,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BaseUnit $baseUnit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BaseUnit $baseUnit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BaseUnit $baseUnit)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'base_unit' => 'required|string|max:10',
            'unit_type_id' => 'required|exists:unit_types,id',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors()
            ], 422);
        }

        $data = $validate->validated();
        $data['is_active'] = $request->has('is_active') ? (bool)$request->is_active : false;

        // Update the existing BaseUnit record
        $baseUnit->update($data);

        // Reload the unitType relationship
        $baseUnit->load('unitType');

        return response()->json([
            'message' => 'Base Unit updated successfully',
            'data' => $baseUnit,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BaseUnit $baseUnit)
    {
        $baseUnit->delete();

        return response()->json(['message' => 'Base unit deletd successfully!', 'status' => true]);
    }
}
