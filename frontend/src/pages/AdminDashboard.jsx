import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_books: 0,
    total_users: 0,
    total_borrowings: 0,
    // Tambahkan key lain jika backend menambahkannya
  });

  useEffect(() => {
    axios.get("/dashboard/summary").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { key: "total_books", label: "Books" },
          { key: "total_users", label: "Users" },
          { key: "total_borrowings", label: "Borrowings" },
        ].map((item) => (
          <motion.div
            key={item.key}
            className="bg-white p-6 rounded shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold">{stats[item.key]}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}