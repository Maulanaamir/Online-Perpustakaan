// src/routes/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

import ProtectedRoute from './ProtectedRoute';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import PublicLayout from '../components/layout/PublicLayout';

import DashboardPage from '../pages/dashboard/DashboardPage';
import BooksPage from '../pages/dashboard/BooksPage';
import UsersPage from '../pages/dashboard/UsersPage';
import BorrowingsPage from '../pages/dashboard/BorrowingsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="borrowings" element={<BorrowingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
