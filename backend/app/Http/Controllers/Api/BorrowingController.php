<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Borrowing;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class BorrowingController extends Controller
{
    // Menampilkan semua buku yang dipinjam oleh user yang sedang login
    public function index()
    {
        $borrowings = Borrowing::with([
            'book.categories', // relasi ke kategori buku
        ])
        ->where('user_id', auth()->id()) // hanya data milik user login
        ->latest()
        ->get();

        return response()->json($borrowings);
    }

    // Proses meminjam buku
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);

        // Cegah peminjaman ulang jika buku masih dipinjam
        $alreadyBorrowed = Borrowing::where('user_id', auth()->id())
            ->where('book_id', $validated['book_id'])
            ->where('status', 'borrowed')
            ->exists();

        if ($alreadyBorrowed) {
            return response()->json([
                'message' => 'Kamu sudah meminjam buku ini dan belum mengembalikannya.',
            ], 422);
        }

        $now = Carbon::now();
        $due = $now->copy()->addDays(7); // durasi peminjaman 7 hari

        $borrowing = Borrowing::create([
            'user_id'     => Auth::id(),
            'book_id'     => $validated['book_id'],
            'borrowed_at' => $now,
            'due_date'    => $due,
            'status'      => 'borrowed',
        ]);

        return response()->json([
            'message'    => 'Buku berhasil dipinjam',
            'borrowing'  => $borrowing,
        ]);
    }

    // Proses pengembalian buku
    public function return($id)
    {
        $borrowing = Borrowing::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('status', 'borrowed')
            ->firstOrFail();

        $borrowing->update([
            'status' => 'returned',
        ]);

        return response()->json([
            'message' => 'Buku berhasil dikembalikan',
        ]);
    }
}
