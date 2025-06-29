import React, { useEffect, useState } from "react";
import axios from "../services/api";
import BookCard from "../components/BookCard";

export default function BorrowedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan indikator loading

  useEffect(() => {
    axios.get("/borrowings")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data peminjaman:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold">Buku yang Dipinjam</h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Memuat data peminjaman...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-400 italic">Kamu belum meminjam buku apa pun.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
          {books.map((b) => (
            <BookCard key={b.id} book={b.book} />
          ))}
        </div>
      )}
    </div>
  );
}
