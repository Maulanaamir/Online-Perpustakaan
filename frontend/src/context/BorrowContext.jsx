// src/context/BorrowContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/api";
import { useAuth } from "./AuthContext";

const BorrowContext = createContext();

export function BorrowProvider({ children }) {
  const { user } = useAuth();
  const [borrowedIds, setBorrowedIds] = useState([]);

  const fetchBorrowed = async () => {
    if (!user) return;
    try {
      const res = await axios.get("/borrowings");
      setBorrowedIds(res.data.map((b) => b.book_id));
    } catch (err) {
      console.error("❌ Gagal fetch borrowings", err);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, [user]);

  return (
    <BorrowContext.Provider value={{ borrowedIds, fetchBorrowed }}>
      {children}
    </BorrowContext.Provider>
  );
}

export function useBorrow() {
  return useContext(BorrowContext);
}
