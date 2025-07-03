// src/components/Categories/CategoryList.jsx
import React from "react";
import axios from "../../services/api";

export default function CategoryList({ categories, onDeleteSuccess }) {
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      await axios.delete(`/categories/${id}`);
      onDeleteSuccess();
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Daftar Kategori</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            {c.name}
            <button
              onClick={() => handleDelete(c.id)}
              className="ml-2 text-red-500 hover:text-red-700 transition text-xs"
              title="Hapus"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {categories.length === 0 && (
        <p className="text-sm text-gray-400 italic">Belum ada kategori.</p>
      )}
    </div>
  );
}
