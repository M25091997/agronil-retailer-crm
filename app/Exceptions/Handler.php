<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;

use Exception;

class Handler extends Exception
{
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized access. Please provide a valid token.',
        ], 401);
    }
}
