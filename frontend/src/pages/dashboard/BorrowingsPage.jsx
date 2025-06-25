import React, { useEffect, useState } from 'react';
import { getBorrowings } from '../../api/dashboard';

const BorrowingsPage = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const data = await getBorrowings();
        setBorrowings(data); // atau data.borrowings kalau respons dibungkus
      } catch (error) {
        console.error('Gagal mengambil data peminjaman:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  if (loading) return <p>Loading data peminjaman...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Peminjaman</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nama User</th>
            <th className="p-2 border">Judul Buku</th>
            <th className="p-2 border">Tanggal Pinjam</th>
            <th className="p-2 border">Tanggal Kembali</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-2 text-center">Tidak ada data</td>
            </tr>
          ) : (
            borrowings.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.user?.name}</td>
                <td className="p-2 border">{item.book?.title}</td>
                <td className="p-2 border">{item.borrowed_at}</td>
                <td className="p-2 border">{item.returned_at || '-'}</td>
                <td className="p-2 border">
                  {item.returned_at ? 'Dikembalikan' : 'Dipinjam'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingsPage;
