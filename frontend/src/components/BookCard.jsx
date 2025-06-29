import React, { useState } from "react";
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

      await refreshBorrowed();
      alert(res.data.message || "Buku berhasil dipinjam");
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
      
      <div className="relative group w-full aspect-[2/3] overflow-hidden rounded border">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover ${book.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            Tidak ada cover
          </div>
        )}

        {/* Overlay Hover Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {hasBorrowed ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 font-semibold px-3 py-1 text-xs rounded shadow hover:bg-green-100 transition"
            >
              📖 Buka Buku
            </a>
          ) : (
            <button
              onClick={handleBorrow}
              className="bg-white text-blue-700 font-semibold px-3 py-1 text-xs rounded shadow hover:bg-blue-100 transition"
              disabled={loading}
            >
              {loading ? "Meminjam..." : "Pinjam"}
            </button>
          )}
        </motion.div>
      </div>

      {/* Informasi Buku */}
      <h2 className="text-md font-semibold line-clamp-2">{book.title}</h2>
      <p className="text-sm text-gray-500 line-clamp-1">oleh {book.author}</p>

      {/* Kategori (Kapsul Kecil) */}
      <div className="flex flex-wrap gap-1 mt-1">
        {book.categories?.length > 0 ? (
          book.categories.map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-[2px] text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-300 rounded-full"
            >
              {cat.name}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic">Tidak ada kategori</span>
        )}
      </div>
    </motion.div>
  );
}
