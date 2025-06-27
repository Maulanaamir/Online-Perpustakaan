import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import BorrowedBooks from "../pages/BorrowedBooks";
import AdminDashboard from "../pages/AdminDashboard";
import Books from "../pages/admin/Books";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import { useAuth } from "../context/AuthContext";

export default function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : user.role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/" />}
        />
      </Route>

      {/* USER */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/borrowed" element={<BorrowedBooks />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
