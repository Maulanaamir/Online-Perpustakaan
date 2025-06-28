import React, { useEffect, useState } from "react";
import axios from "../../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await axios.post("/categories", { name });
    setName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manajemen Kategori</h1>

      {/* Form Tambah */}
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

      {/* List Kategori */}
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
    </div>
  );
}
