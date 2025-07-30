<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'sort_description' => 'nullable|string|max:1000',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'disease_id' => 'nullable|exists:diseases,id',
            'sku' => 'nullable|string|max:100',
            'unit_type' => 'nullable|string|max:100',
            'base_unit' => 'nullable|string|max:100',
            'hsn_code' => 'nullable|string|max:20',
            'specification' => 'nullable|string',
            'description' => 'nullable|string',
            'other_information' => 'nullable|string',
            'is_active' => 'nullable',



            'product_variant_price' => 'required|array',
            // 'product_variant_price.*.unit_type_id' => 'nullable|exists:unit_types,id',
            // 'product_variant_price.*.unit_type' => 'required|string',
            // 'product_variant_price.*.base_unit_id' => 'required|exists:base_units,id',
            // 'product_variant_price.*.base_unit' => 'required|string',
            'product_variant_price.*.quantity' => 'required|numeric|min:0',
            'product_variant_price.*.price' => 'required|numeric|min:0',
            'product_variant_price.*.original_price' => 'nullable|numeric|min:0',
            'product_variant_price.*.unit_rate' => 'nullable|numeric|min:0',
            // 'product_variant_price.*.discount' => 'nullable|numeric|min:0',
            'product_variant_price.*.stock' => 'required|integer|min:0',
            'product_variant_price.*.is_bulk' => 'required|boolean',
            'product_variant_price.*.is_active' => 'required|boolean',
        ];

        // Image validation
        if ($this->isMethod('post')) {
            // On create
            $rules['images'] = 'required|array|min:1';
            $rules['images.*'] = 'image|mimes:jpg,jpeg,png,webp|max:5048';
        } else {
            // On update
            $rules['images'] = 'nullable|array';
            $rules['images.*'] = 'image|mimes:jpg,jpeg,png,webp|max:5048';
        }

        return $rules;
    }
}
