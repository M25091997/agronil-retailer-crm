<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Category/SubCategoryList', [
            'subCategories' => SubCategory::with('category')->latest()->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        return Inertia::render('Admin/Category/SubCategoryForm', [
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
            'category_id' => 'required|exists:categories,id',
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
        $subCategory = new SubCategory();
        $subCategory->name = $request->name;
        $subCategory->user_id = auth()->user()->id;

        // $subCategory->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $subCategory->image = $request->file('image')->store('uploads/categories', 'public');
        }

        $subCategory->category_id = $request->category_id ?? '';
        $subCategory->description = $request->description ?? '';
        $subCategory->is_active = $request->has('is_active') ? true : false;
        $subCategory->save();

        return response()->json(['message' => 'Sub Category created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        $categories = Category::where('is_active', true)->get();
        return Inertia::render('Admin/Category/SubCategoryForm', [
            'categories' =>  $categories,
            'subCategory' => $subCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubCategory $subCategory)
    {
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $oldImage = $subCategory->getRawOriginal('image');

            if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                Storage::disk('public')->delete($oldImage);
            }
            $data['image'] = $request->file('image')->store('uploads/categories', 'public');
        }

        $subCategory->update($data);

        return response()->json([
            'message' => 'Sub category updated successfully.',
            'subCategory' => $subCategory
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        $oldImage = $subCategory->getRawOriginal('image');
        if ($oldImage && Storage::disk('public')->exists($oldImage)) {
            Storage::disk('public')->delete($oldImage);
        }

        $subCategory->delete();
        return response()->json(['message' => 'Sub category deleted successfully.']);
    }
}
