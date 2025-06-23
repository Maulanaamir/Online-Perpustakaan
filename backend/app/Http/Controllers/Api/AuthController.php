<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // 🔐 Register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => 'user', // default
        ]);

        return response()->json(['message' => 'Register berhasil', 'user' => $user], 201);
    }

    // 🔑 Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Login gagal'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Login berhasil',
            'user'    => $user,
            'token'   => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    // 👤 Ambil data user
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // 🚪 Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout berhasil']);
    }
}