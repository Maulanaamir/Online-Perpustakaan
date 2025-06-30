import React, { useEffect, useState } from "react";
import axios from "../services/api";
import BookCard from "../components/BookCard";
import BookCardSkeleton from "../components/BookCardSkeleton";
import PopularCarousel from "../components/PopularCarousel";
import { BookOpenIcon } from "@heroicons/react/24/outline";



export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("❌ Gagal ambil data buku:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 📚 Buku Terpopuler */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <BookOpenIcon className="w-6 h-6 text-blue-600" />
        Buku Terpopuler
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Buku yang paling banyak dipinjam oleh pengguna
      </p>
      <PopularCarousel />

      {/* 📖 Daftar Semua Buku */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Daftar Buku</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))
          : books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
