<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Brand/BrandList', [
            'brands' => Brand::latest()->get(),
            // 'brands' => Brand::where('is_active', true)->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        return Inertia::render('Admin/Brand/BrandForm', [
            'categories' =>  $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // If passed validation, save the category
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->user_id = auth()->user()->id;

        // $brand->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/categories'), $filename);
            $brand->image = 'uploads/categories/' . $filename;
        }

        $brand->category_id = $request->category_id;
        $brand->description = $request->description ?? '';
        $brand->is_active = $request->has('is_active') ? true : false;
        $brand->save();

        return response()->json(['message' => 'Brand name created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brand/BrandForm', [
            'categories' => Category::where('is_active', true)->get(),
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }


        $brand->name = $request->name;
        $brand->user_id = auth()->user()->id;

        // $brand->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/categories'), $filename);
            $brand->image = 'uploads/categories/' . $filename;
        }

        $brand->category_id = $request->category_id;
        $brand->description = $request->description ?? '';
        $brand->is_active = $request->has('is_active') ? true : false;
        $brand->update();

        return response()->json(['message' => 'Brand name updated successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if ($brand->image && Storage::exists($brand->image)) {
            Storage::delete($brand->image);
        }

        $brand->delete();

        return response()->json(['message' => 'Brand name deleted successfully.']);
    }
}
