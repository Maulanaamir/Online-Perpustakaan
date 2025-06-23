<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BorrowingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);

// Buku
Route::get('/books', [BookController::class, 'index']);
Route::post('/books', [BookController::class, 'store']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::put('/books/{id}', [BookController::class, 'update']);
Route::delete('/books/{id}', [BookController::class, 'destroy']);

// Peminjaman
Route::post('/borrow', [BorrowingController::class, 'borrow']);
Route::post('/return/{id}', [BorrowingController::class, 'return']);
Route::get('/borrowings', [BorrowingController::class, 'index']);
});