import React, { useEffect, useState } from "react";
import axios from "../services/api";
import BookCard from "../components/BookCard";

export default function BorrowedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/borrowings").then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Buku yang Dipinjam</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b) => (
          <BookCard key={b.id} book={b.book} />
        ))}
      </div>
    </div>
  );
}
