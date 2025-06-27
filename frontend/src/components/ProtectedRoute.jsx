import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const location = useLocation();

  // Belum login? Redirect ke login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika halaman khusus admin, tapi bukan admin → tendang
  if (adminOnly && user.role.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Jika halaman untuk user biasa, tapi yang login admin → arahkan ke dashboard admin
  if (!adminOnly && user.role.toLowerCase() === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Role cocok, izinkan akses
  return children;
}
