<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductBulkPrice extends Model
{
    protected $fillable = ['product_variant_id', 'product_id', 'pieces_per_box', 'bulk_qty_range', 'bulk_price', 'total_box_price', 'margin', 'bulk_stock', 'best_value', 'is_active'];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
