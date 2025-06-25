import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/books';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data); // atau data.books jika API kamu mengembalikan { books: [...] }
      } catch (error) {
        console.error('Gagal mengambil data buku:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading data buku...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Buku</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Penulis</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">File</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-2 text-center">Tidak ada data</td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr key={book.id} className="border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{book.title}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border">{book.category?.name || '-'}</td>
                <td className="p-2 border">
                  <a
                    href={`http://localhost:8000/storage/${book.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Buka
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksPage;
