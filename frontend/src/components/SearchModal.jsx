import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../services/api";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") return;
    const timeout = setTimeout(async () => {
      const res = await axios.get(`/books/search?q=${query}`);
      setResults(res.data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Search Book</h2>
          <button onClick={onClose}>✖</button>
        </div>
        <input
          type="text"
          placeholder="Type book name..."
          className="w-full border px-3 py-2 mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul>
          {results.map((book) => (
            <li key={book.id} className="py-2 border-b">
              {book.title} — {book.author}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
