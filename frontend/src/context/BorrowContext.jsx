// src/context/BorrowContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/api";
import { useAuth } from "./AuthContext";

const BorrowContext = createContext();

export function BorrowProvider({ children }) {
  const { user } = useAuth();
  const [borrowedIds, setBorrowedIds] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchBorrowed = async () => {
    if (!user) {
      setBorrowedIds([]); // Reset saat logout
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("/borrowings");
      const ids = res.data.map((b) => b.book_id); 
      setBorrowedIds(ids);
    } catch (err) {
      console.error("❌ Gagal fetch borrowings", err);
      setBorrowedIds([]); // fallback jika error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, [user]);

  return (
    <BorrowContext.Provider
      value={{
        borrowedIds,
        refreshBorrowed: fetchBorrowed, 
        loadingBorrowed: loading,
      }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export function useBorrow() {
  return useContext(BorrowContext);
}
