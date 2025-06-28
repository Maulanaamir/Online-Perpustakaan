  import React, { useEffect, useState } from "react";
  import axios from "../services/api";
  import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
<div className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-4">Daftar Buku</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
</div>

  );
}
