

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axios.post("/login", credentials);
    const data = res.data;
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ /user response:", res.data); 

      
      const u = res.data;
      const normalizedUser = {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      };

      console.log("User set in AuthContext:", normalizedUser);
      setUser(normalizedUser);
    } catch (err) {
      console.error("❌ Gagal ambil data user:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
