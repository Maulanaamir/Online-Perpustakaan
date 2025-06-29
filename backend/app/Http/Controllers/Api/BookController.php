<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Book;
use App\Models\Category;

class BookController extends Controller
{
    // 📘 List semua buku (dengan semua kategori)
    public function index(Request $request)
    {
        $query = Book::with('categories');

        // Jika ada query popular=1, urutkan berdasarkan jumlah peminjaman terbanyak
        if ($request->has('popular') && $request->popular == 1) {
            $query->withCount('borrowings')->orderByDesc('borrowings_count');
        }

        return response()->json($query->get());
    }

    // 📘 Lihat satu buku
    public function show($id)
    {
        $book = Book::with('categories')->findOrFail($id);
        return response()->json($book);
    }

    // ➕ Tambah buku baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'author'       => 'required|string|max:255',
            'categories'   => 'required|array',
            'categories.*' => 'exists:categories,id',
            'file'         => 'required|mimes:pdf,epub|max:10240',
            'cover'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $filePath = $request->file('file')->store('books', 'public');

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        $book = Book::create([
            'title'      => $validated['title'],
            'author'     => $validated['author'],
            'file_path'  => $filePath,
            'cover_path' => $coverPath,
        ]);

        $book->categories()->attach($validated['categories']);

        return response()->json([
            'message' => 'Buku berhasil ditambahkan',
            'book'    => $book->load('categories')
        ], 201);
    }

    // ✏️ Update buku
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'author'       => 'sometimes|required|string|max:255',
            'categories'   => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'file'         => 'nullable|mimes:pdf,epub|max:10240',
            'cover'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($book->file_path);
            $book->file_path = $request->file('file')->store('books', 'public');
        }

        if ($request->hasFile('cover')) {
            if ($book->cover_path) {
                Storage::disk('public')->delete($book->cover_path);
            }
            $book->cover_path = $request->file('cover')->store('covers', 'public');
        }

        $book->update([
            'title'  => $validated['title'] ?? $book->title,
            'author' => $validated['author'] ?? $book->author,
        ]);

        if (isset($validated['categories'])) {
            $book->categories()->sync($validated['categories']);
        }

        return response()->json([
            'message' => 'Buku berhasil diperbarui',
            'book'    => $book->load('categories')
        ]);
    }

    // ❌ Hapus buku
    public function destroy($id)
    {
        $book = Book::findOrFail($id);

        $book->categories()->detach();

        Storage::disk('public')->delete($book->file_path);
        if ($book->cover_path) {
            Storage::disk('public')->delete($book->cover_path);
        }

        $book->delete();

        return response()->json(['message' => 'Buku berhasil dihapus']);
    }
}