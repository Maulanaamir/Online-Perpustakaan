<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Borrowing;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class BorrowingController extends Controller
{
    // Menampilkan buku yang sedang dipinjam (belum dikembalikan)
    public function index()
    {
        $borrowings = Borrowing::with(['book.categories'])
            ->where('user_id', auth()->id())
            ->where('status', 'borrowed') // hanya yang belum dikembalikan
            ->latest()
            ->get();

        return response()->json($borrowings, 200);
    }

    // Menampilkan riwayat peminjaman yang sudah dikembalikan
    public function history()
    {
        $history = Borrowing::with(['book.categories'])
            ->where('user_id', auth()->id())
            ->where('status', 'returned') // hanya yang sudah dikembalikan
            ->latest()
            ->get();

        return response()->json($history, 200);
    }

    // Proses meminjam buku
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);

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
        $due = $now->copy()->addDays(7);

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
        ], 200);
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
        ], 200);
    }
}