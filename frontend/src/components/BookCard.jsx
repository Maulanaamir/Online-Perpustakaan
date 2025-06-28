import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBorrow } from "../context/BorrowContext";
import axios from "../services/api";

export default function BookCard({ book }) {
  const { user } = useAuth();
  const { borrowedIds, refreshBorrowed } = useBorrow();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const hasBorrowed = borrowedIds.includes(book.id);

  const handleBorrow = async () => {
    if (!user) return navigate("/login");
    if (hasBorrowed || loading) return;

    try {
      setLoading(true);
      const res = await axios.post("/borrow", { book_id: book.id });
      alert(res.data.message || "Buku berhasil dipinjam");
      await refreshBorrowed(); // Sinkronkan ulang
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal meminjam buku.");
    } finally {
      setLoading(false);
    }
  };

  const fileUrl =
    axios.defaults.baseURL.replace("/api", "") + "/storage/" + book.file_path;
  const coverUrl = book.cover_path
    ? axios.defaults.baseURL.replace("/api", "") + "/storage/" + book.cover_path
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-3 w-[200px] shadow hover:shadow-lg transition space-y-2"
    >
      {/* Cover Buku */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={`Cover ${book.title}`}
          className="w-full aspect-[2/3] object-cover rounded border"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm border rounded">
          Tidak ada cover
        </div>
      )}

      {/* Informasi Buku */}
      <h2 className="text-md font-semibold line-clamp-2">{book.title}</h2>
      <p className="text-sm text-gray-500 line-clamp-1">oleh {book.author}</p>
      <p className="text-xs italic text-gray-400">
        Kategori: {book.category?.name || "Tidak ada"}
      </p>

      {/* Tombol */}
      <div className="pt-1">
        {hasBorrowed ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 text-sm underline font-medium"
          >
            📖 Buka Buku
          </a>
        ) : (
          <button
            onClick={handleBorrow}
            className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Meminjam..." : "Pinjam"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
