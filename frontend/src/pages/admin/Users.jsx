import React, { useEffect, useState } from "react";
import axios from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
