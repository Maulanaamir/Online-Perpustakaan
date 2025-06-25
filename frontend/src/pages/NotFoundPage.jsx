import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Halaman tidak ditemukan</p>
      <Link
        to="/login"
        className="text-blue-600 hover:underline text-lg"
      >
        Kembali ke halaman login
      </Link>
    </div>
  );
};

export default NotFoundPage;
