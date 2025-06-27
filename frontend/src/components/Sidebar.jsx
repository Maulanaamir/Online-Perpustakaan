import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBook,
  IconCategory2,
  IconHome2,
  IconLogout,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(true);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <IconHome2 size={20} /> },
    { label: "Books", href: "/admin/books", icon: <IconBook size={20} /> },
    { label: "Categories", href: "/admin/categories", icon: <IconCategory2 size={20} /> },
    { label: "Users", href: "/admin/users", icon: <IconUserBolt size={20} /> },
    { label: "Settings", href: "#", icon: <IconSettings size={20} /> },
    { label: "Logout", href: "#", icon: <IconLogout size={20} /> },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ${
          open ? "w-64" : "w-16"
        } bg-gray-900 text-white flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold">
            {open ? "Admin Panel" : "AP"}
          </span>
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <IconChevronLeft size={20} /> : <IconChevronRight size={20} />}
          </button>
        </div>

        <div className="flex flex-col gap-1 px-2 flex-1">
          {links.map((link, idx) => {
            if (link.label === "Logout") {
              return (
                <motion.button
                  key={idx}
                  onClick={handleLogout}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 px-3 py-2 rounded transition w-full text-left bg-red-600 hover:bg-red-700"
                >
                  {link.icon}
                  {open && <span>Logout</span>}
                </motion.button>
              );
            }

            return (
              <Link
                to={link.href}
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 rounded transition ${
                  location.pathname === link.href
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
              >
                {link.icon}
                {open && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
