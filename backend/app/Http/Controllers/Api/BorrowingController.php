<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Borrowing;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class BorrowingController extends Controller
{
    public function index()
    {
        return Borrowing::with(['book', 'user'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);

        $now = Carbon::now();
        $due = $now->copy()->addDays(7); // misal pinjam 7 hari

        $borrowing = Borrowing::create([
            'user_id'     => Auth::id(),
            'book_id'     => $validated['book_id'],
            'borrowed_at' => $now,
            'due_date'    => $due,
            'status'      => 'borrowed',
        ]);

        return response()->json(['message' => 'Buku berhasil dipinjam', 'borrowing' => $borrowing]);
    }

    public function return($id)
    {
        $borrowing = Borrowing::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('status', 'borrowed')
            ->firstOrFail();

        $borrowing->update([
            'status' => 'returned',
        ]);

        return response()->json(['message' => 'Buku berhasil dikembalikan']);
    }
}