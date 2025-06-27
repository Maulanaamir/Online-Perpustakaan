import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BookCard({ book }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBorrow = () => {
    if (!user) {
      navigate("/login");
    } else {
      // Logika meminjam akan ditambahkan nanti
      alert("Berhasil meminjam buku!");
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
