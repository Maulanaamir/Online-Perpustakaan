import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import SearchModal from "./SearchModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "../services/api";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Ambil data kategori dari backend saat mount
  useEffect(() => {
    axios.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Gagal mengambil kategori:", err));
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md relative z-50">
        {/* Kiri kosong (bisa isi logo kalau mau) */}
        <div className="w-1/3" />

        {/* Tengah: Navigasi utama */}
        <div className="w-1/3 flex justify-center space-x-8 font-medium text-gray-800">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/books" className="hover:text-blue-600">Book</Link>

          {/* Dropdown Category */}
          <div className="relative group">
            <span className="cursor-pointer hover:text-blue-600">Category</span>
            <div className="
              absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200
            ">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {cat.name}
                </Link>
              ))}
              {categories.length === 0 && (
                <span className="block px-4 py-2 text-sm text-gray-400">
                  Tidak ada kategori
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Kanan: Search & Auth */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          <button
            onClick={() => setShowSearch(true)}
            className="text-gray-600 hover:text-black"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>

          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Modal Pencarian */}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  );
}
