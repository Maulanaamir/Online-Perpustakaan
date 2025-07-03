// src/components/Categories/CategoryForm.jsx
import React, { useState } from "react";
import axios from "../../services/api";

export default function CategoryForm({ onSuccess }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await axios.post("/categories", { name });
    setName("");
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-4 max-w-md space-y-3"
    >
      <label className="block font-medium text-gray-700">Tambah Kategori Baru</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nama kategori..."
          className="border border-gray-300 px-3 py-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>
    </form>
  );
}
