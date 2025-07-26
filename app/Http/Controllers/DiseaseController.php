<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Disease;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DiseaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Diseases/DiseasesList', [
            'diseases' => Disease::with('category')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Diseases/DiseasesForm', [
            'categories' => Category::where('is_active', true)->get(),
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
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }


        $disease = new Disease();
        $disease->name = $request->name;
        $disease->user_id = auth()->user()->id;

        // $disease->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/categories'), $filename);
            $disease->image = 'uploads/categories/' . $filename;
        }

        $disease->category_id = $request->category_id;
        $disease->description = $request->description ?? '';
        $disease->is_active = $request->has('is_active') ? true : false;
        $disease->save();

        return response()->json(['message' => 'Disease name created successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Disease $disease)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Disease $disease)
    {
        return Inertia::render('Admin/Diseases/DiseasesForm', [
            'categories' => Category::where('is_active', true)->get(),
            'disease' => $disease,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Disease $disease)
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

        $disease->name = $request->name;
        $disease->user_id = auth()->user()->id;

        // $disease->slug = $this->generateUniqueSlug($request->name);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/categories'), $filename);
            $disease->image = 'uploads/categories/' . $filename;
        }

        $disease->category_id = $request->category_id;
        $disease->description = $request->description ?? '';
        $disease->is_active = $request->has('is_active') ? true : false;
        $disease->update();

        return response()->json(['message' => 'Disease name updated successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disease $disease)
    {
        if ($disease->image && Storage::exists($disease->image)) {
            Storage::delete($disease->image);
        }

        $disease->delete();

        return response()->json(['message' => 'Disease name deleted successfully.']);
    }
}
