import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-6 font-semibold text-gray-800">
          <Link to="/">Home</Link>
          <Link to="/">Book</Link>
          <Link to="/">Category</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSearch(true)}
            className="text-gray-600 hover:text-black"
          >
            🔍
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

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  );
}
