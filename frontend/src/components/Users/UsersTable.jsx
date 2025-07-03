// src/components/Users/UsersTable.jsx
import React from "react";

export default function UsersTable({ users }) {
  return (
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
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="p-2 border">{i + 1}</td>
            <td className="p-2 border">{u.name}</td>
            <td className="p-2 border">{u.email}</td>
            <td className="p-2 border capitalize">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
