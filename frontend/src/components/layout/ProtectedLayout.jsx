
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Perpustakaan</h2>
        <nav className="flex flex-col space-y-2">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/dashboard/books" className="hover:underline">Buku</a>
          <a href="/dashboard/users" className="hover:underline">Pengguna</a>
          <a href="/dashboard/borrowings" className="hover:underline">Peminjaman</a>
          <button onClick={handleLogout} className="mt-4 text-red-400 hover:text-red-600">Logout</button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
