// src/components/Books/BookTable.jsx
import React from "react";
import BookRow from "./BookRow";

export default function BookTable({ books, onEdit, onRefresh }) {
  return (
    <table className="w-full mt-4 border rounded overflow-hidden text-left">
      <thead>
        <tr className="bg-gray-100 text-sm text-gray-700 uppercase">
          <th className="p-3 border">#</th>
          <th className="p-3 border">Cover</th>
          <th className="p-3 border">Judul</th>
          <th className="p-3 border">Penulis</th>
          <th className="p-3 border">Kategori</th>
          <th className="p-3 border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <BookRow
            key={book.id}
            book={book}
            index={idx}
            onEdit={onEdit}
            onRefresh={onRefresh}
          />
        ))}
      </tbody>
    </table>
  );
}
