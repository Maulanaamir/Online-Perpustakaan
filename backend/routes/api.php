<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BorrowingController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserManagementController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    // Auth
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Buku (akses umum)
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{id}', [BookController::class, 'show']);

    // Kategori (akses umum)
    Route::get('/categories', [CategoryController::class, 'index']);

    // Peminjaman
    Route::post('/borrow', [BorrowingController::class, 'borrow']);
    Route::post('/return/{id}', [BorrowingController::class, 'return']);
    Route::get('/borrowings', [BorrowingController::class, 'index']);

    // Route admin only
    Route::middleware('role:admin')->group(function () {

        // Buku
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{id}', [BookController::class, 'update']);
        Route::delete('/books/{id}', [BookController::class, 'destroy']);

        // Kategori
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

        // User
        Route::get('/users', [UserManagementController::class, 'index']);
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']);

        // Statistik ringkas dashboard
        Route::get('/dashboard/summary', function () {
            return response()->json([
                'total_users'      => \App\Models\User::count(),
                'total_books'      => \App\Models\Book::count(),
                'total_borrowings' => \App\Models\Borrowing::count(),
            ]);
        });
    });
});