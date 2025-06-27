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
    await axios.post("/categories", { name });
    setName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kategori Buku</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Nama Kategori"
          className="border px-3 py-2 flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Tambah
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {categories.map((c) => (
          <li key={c.id} className="flex justify-between border p-2 rounded">
            <span>{c.name}</span>
            <button onClick={() => handleDelete(c.id)} className="text-red-500">
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
