import React, { useState } from 'react';
import { createBook } from '../../api/dashboard';

const BookForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBook({ title, author, category_id });
      setTitle('');
      setAuthor('');
      setCategoryId('');
      onSuccess(); // Refresh data di BooksPage
    } catch (error) {
      console.error('Gagal menambahkan buku:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Tambah Buku Baru</h2>

      <input
        type="text"
        placeholder="Judul Buku"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Penulis"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="ID Kategori"
        value={category_id}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Menyimpan...' : 'Tambah Buku'}
      </button>
    </form>
  );
};

export default BookForm;
