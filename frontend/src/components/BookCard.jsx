import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../services/api"; // pastikan file axios setup sudah meng-handle token

export default function BookCard({ book }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBorrow = async () => {
    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await axios.post("/borrow", {
          book_id: book.id,
        });
        alert(response.data.message); // "Buku berhasil dipinjam"
      } catch (error) {
        console.error(error);
        alert(
          error?.response?.data?.message ||
            "Gagal meminjam buku. Mungkin sudah dipinjam?"
        );
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-4 shadow hover:shadow-xl transition"
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleBorrow}
      >
        Pinjam
      </button>
    </motion.div>
  );
}
