import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        {user.name}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden z-50"
          >
            <button
              onClick={() => navigate("/borrowed")}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Buku Dipinjam
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
