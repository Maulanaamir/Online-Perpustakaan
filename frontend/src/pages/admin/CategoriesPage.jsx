// src/pages/admin/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import CategoryForm from "../../components/Categories/CategoryForm";
import CategoryList from "../../components/Categories/CategoryList";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
      <CategoryForm onSuccess={fetchCategories} />
      <CategoryList categories={categories} onDeleteSuccess={fetchCategories} />
    </div>
  );
}
