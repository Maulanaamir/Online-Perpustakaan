import React, { useEffect, useState } from "react";
import axios from "../../services/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", category_id: "" });
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const [resBooks, resCats] = await Promise.all([
      axios.get("/books"),
      axios.get("/categories"),
    ]);
    setBooks(resBooks.data);
    setCategories(resCats.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/books/${editingId}`, form);
    } else {
      await axios.post("/books", form);
    }
    setForm({ title: "", author: "", category_id: "" });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      category_id: book.category_id,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/books/${id}`);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manajemen Buku</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Judul"
          className="border px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Penulis"
          className="border px-3 py-2"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <select
          className="border px-3 py-2"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">
          {editingId ? "Update" : "Tambah"} Buku
        </button>
      </form>

      <table className="w-full mt-4 text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Penulis</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, idx) => (
            <tr key={b.id}>
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">{b.category?.name || "-"}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="text-red-500"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
