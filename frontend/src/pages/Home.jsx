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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }
