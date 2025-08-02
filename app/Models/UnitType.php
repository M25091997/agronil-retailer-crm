<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitType extends Model
{
    protected $fillable = ['name', 'unit', 'is_active'];

    public function scopeWhereIsActive($query)
    {
        return $query->where('is_active', true);
    }
}
