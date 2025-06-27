import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
