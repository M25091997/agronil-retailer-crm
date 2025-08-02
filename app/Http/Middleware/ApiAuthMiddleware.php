<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Passport\Exceptions\MissingScopeException;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (AuthenticationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized: Token is missing or invalid.',
            ], 401);
        } catch (MissingScopeException $e) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have the required scope to access this resource.',
            ], 403);
        }
    }
}
