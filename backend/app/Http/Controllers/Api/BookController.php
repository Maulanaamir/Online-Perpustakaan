<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Book;
use App\Models\Category;

class BookController extends Controller
{
    // 📘 List semua buku (dengan kategori)
    public function index()
    {
        $books = Book::with('category')->get();
        return response()->json($books);
    }

    // 📘 Lihat satu buku
    public function show($id)
    {
        $book = Book::with('category')->findOrFail($id);
        return response()->json($book);
    }

    // ➕ Tambah buku baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'file'        => 'required|mimes:pdf,epub|max:10240',
            'cover'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Simpan file buku
        $filePath = $request->file('file')->store('books', 'public');

        // Simpan cover jika ada
        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        // Buat data buku
        $book = Book::create([
            'title'       => $validated['title'],
            'author'      => $validated['author'],
            'category_id' => $validated['category_id'] ?? null,
            'file_path'   => $filePath,
            'cover_path'  => $coverPath,
        ]);

        return response()->json(['message' => 'Buku berhasil ditambahkan', 'book' => $book], 201);
    }

    // ✏️ Update buku
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'author'      => 'sometimes|required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'file'        => 'nullable|mimes:pdf,epub|max:10240',
            'cover'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Update file PDF jika diupload ulang
        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($book->file_path);
            $book->file_path = $request->file('file')->store('books', 'public');
        }

        // Update cover jika diupload ulang
        if ($request->hasFile('cover')) {
            if ($book->cover_path) {
                Storage::disk('public')->delete($book->cover_path);
            }
            $book->cover_path = $request->file('cover')->store('covers', 'public');
        }

        $book->update([
            'title'       => $validated['title'] ?? $book->title,
            'author'      => $validated['author'] ?? $book->author,
            'category_id' => $validated['category_id'] ?? $book->category_id,
        ]);

        return response()->json(['message' => 'Buku berhasil diperbarui', 'book' => $book]);
    }

    // ❌ Hapus buku
    public function destroy($id)
    {
        $book = Book::findOrFail($id);

        Storage::disk('public')->delete($book->file_path);
        if ($book->cover_path) {
            Storage::disk('public')->delete($book->cover_path);
        }

        $book->delete();

        return response()->json(['message' => 'Buku berhasil dihapus']);
    }
}
