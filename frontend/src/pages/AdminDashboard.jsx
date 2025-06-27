import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    books: 0,
    categories: 0,
    users: 0,
    borrowings: 0,
    popularBook: null,
  });

useEffect(() => {
  axios.get("/dashboard/summary").then((res) => {
    setStats(res.data);
  });
}, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["books", "categories", "users", "borrowings"].map((key) => (
          <motion.div
            key={key}
            className="bg-white p-6 rounded shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold">{stats[key]}</div>
            <div className="text-sm text-gray-600 capitalize">{key}</div>
          </motion.div>
        ))}
      </div>

      {stats.popularBook && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">📚 Buku Terpopuler:</h2>
          <p className="text-gray-700">
            {stats.popularBook.title} oleh {stats.popularBook.author}
          </p>
        </div>
      )}
    </div>
  );
}
