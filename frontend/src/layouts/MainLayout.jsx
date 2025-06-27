// src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="px-4 py-6">{children}</main>
    </>
  );
}
