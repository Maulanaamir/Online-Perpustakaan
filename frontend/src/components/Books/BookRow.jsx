// src/components/Books/BookRow.jsx
import React from "react";
import axios from "../../services/api";

export default function BookRow({ book, index, onEdit, onRefresh }) {
  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus buku ini?")) return;
    await axios.delete(`/books/${book.id}`);
    onRefresh();
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 border">{index + 1}</td>
      <td className="p-3 border">
        {book.cover_path ? (
          <img
            src={`http://localhost:8000/storage/${book.cover_path}`}
            alt="cover"
            className="w-12 h-16 object-cover rounded shadow"
          />
        ) : (
          <span>-</span>
        )}
      </td>
      <td className="p-3 border">{book.title}</td>
      <td className="p-3 border">{book.author}</td>
      <td className="p-3 border text-sm text-gray-700">
        {book.categories?.length > 0
          ? book.categories.map((cat) => cat.name).join(", ")
          : "-"}
      </td>
      <td className="p-3 border text-center space-x-2">
        <button
          onClick={() => onEdit(book)}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Hapus
        </button>
      </td>
    </tr>
  );
}
