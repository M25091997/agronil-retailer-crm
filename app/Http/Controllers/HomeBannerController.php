<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\HomeBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Banner/HomeBannerList', [
            'banners' => HomeBanner::with('category')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Banner/HomeBannerForm', [
            'categories' => Category::whereIsActive()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
            'description' => 'nullable|string',
            'btn_txt' => 'nullable|string',
            'url' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // If passed validation, save the category
        $banner = new HomeBanner();
        $banner->title = $request->title;
        $banner->btn_txt = $request->btn_txt;
        $banner->url = $request->url;
        $banner->title = $request->title;
        $banner->user_id = auth()->user()->id;


        if ($request->hasFile('image')) {
            $banner->image = $request->file('image')->store('uploads/banners', 'public');
        }

        $banner->category_id = $request->category_id ?? '';
        $banner->description = $request->description ?? '';
        $banner->is_active = $request->has('is_active') ? true : false;
        $banner->save();

        return response()->json(['message' => 'Home banner saved successfully.'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(HomeBanner $homeBanner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomeBanner $homeBanner)
    {
        return Inertia::render('Admin/Banner/HomeBannerForm', [
            'categories' => Category::whereIsActive()->get(),
            'banner' => $homeBanner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeBanner $homeBanner)
    { {
            $validator = Validator::make($request->all(), [
                'title'        => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6048',
                'description' => 'nullable|string',
                'btn_txt' => 'nullable|string',
                'url' => 'nullable|string',
                'is_active' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }


            $homeBanner->title = $request->title;
            $homeBanner->btn_txt = $request->btn_txt;
            $homeBanner->url = $request->url;
            $homeBanner->title = $request->title;
            $homeBanner->user_id = auth()->user()->id;

            // if ($request->hasFile('image')) {
            //     if ($homeBanner->image && Storage::exists($homeBanner->image)) {
            //         Storage::delete($homeBanner->image);
            //     }
            //     $uploadPath = 'uploads/banners/';
            //     if ($request->hasFile('image')) {
            //         $path = $request->file('image')->store($uploadPath, 'public');
            //         $homeBanner->image = Storage::url($path);
            //     }
            // }

            if ($request->hasFile('image')) {
                $oldImage = $homeBanner->getRawOriginal('image');

                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
                $homeBanner->image = $request->file('image')->store('uploads/banners', 'public');
            }



            $homeBanner->category_id = $request->category_id ?? '';
            $homeBanner->description = $request->description ?? '';
            $homeBanner->is_active = $request->has('is_active') ? true : false;
            $homeBanner->update();

            return response()->json(['message' => 'Home banner updated successfully.'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeBanner $homeBanner)
    {
        $oldImage = $homeBanner->getRawOriginal('image');

        if ($oldImage && Storage::disk('public')->exists($oldImage)) {
            Storage::disk('public')->delete($oldImage);
        }

        $homeBanner->delete();

        return response()->json(['message' => 'Disease name deleted successfully.']);
    }
}
