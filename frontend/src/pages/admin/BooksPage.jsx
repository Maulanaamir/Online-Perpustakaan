// src/pages/admin/BooksPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import BookTable from "../../components/Books/BookTable";
import BookFormModal from "../../components/Books/BookFormModal";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);

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

  const openModal = (book = null) => {
    setFormData(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setFormData(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Buku</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Tambah Buku
        </button>
      </div>

      <BookTable books={books} onEdit={openModal} onRefresh={fetchData} />

      <BookFormModal
        isOpen={isOpen}
        onClose={closeModal}
        categories={categories}
        book={formData}
        onRefresh={fetchData}
      />
    </div>
  );
}
