// src/pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import UsersTable from "../../components/Users/UsersTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
      <UsersTable users={users} />
    </div>
  );
}
