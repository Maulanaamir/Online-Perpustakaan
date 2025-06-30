import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBorrow } from "../context/BorrowContext";
import { BookOpenIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function PopularCarousel() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const { borrowedIds, setBorrowedIds, fetchBorrowed } = useBorrow();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const res = await axios.get("/books?popular=1");
        setBooks(res.data.slice(0, 3));
      } catch (err) {
        console.error("Gagal fetch buku populer", err);
      }
    };
    fetchPopularBooks();
  }, []);

  const handleAction = async (book) => {
    if (!user) return navigate("/login");

    const hasBorrowed = borrowedIds.includes(book.id);
    if (hasBorrowed) {
      const fileUrl =
        axios.defaults.baseURL.replace("/api", "") +
        "/storage/" +
        book.file_path;
      window.open(fileUrl, "_blank");
    } else {
      try {
        await axios.post("/borrow", { book_id: book.id });
        alert("Buku berhasil dipinjam");

        // refresh data, tapi jangan bikin error kalau gagal
        try {
          await fetchBorrowed();
        } catch (e) {
          console.warn("Gagal refresh data pinjaman:", e);
        }
      } catch (err) {
        console.error("Gagal meminjam buku", err);
        alert(err.response?.data?.message || "Gagal meminjam buku.");
      }
    }
  };

  return (
    <div className="mb-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {books.map((book) => {
          const hasBorrowed = borrowedIds.includes(book.id);

          return (
            <SwiperSlide key={book.id}>
              <div className="relative h-[400px] md:h-[450px] bg-gradient-to-r from-indigo-900 to-purple-800 text-white rounded-xl overflow-hidden shadow-lg flex items-center p-6">
                <img
                  src={
                    axios.defaults.baseURL.replace("/api", "") +
                    "/storage/" +
                    book.cover_path
                  }
                  alt={book.title}
                  className="h-full rounded-md object-cover shadow-md"
                />
                <div className="ml-6 max-w-xl">
                  <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                  <p className="text-sm mb-2 text-gray-200 italic">
                    oleh {book.author}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.categories?.map((cat) => (
                      <span
                        key={cat.id}
                        className="text-xs bg-white/10 border border-white/20 rounded-full px-2 py-[2px]"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleAction(book)}
                    className={`${
                      hasBorrowed
                        ? "bg-white text-indigo-700 hover:bg-indigo-100"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    } font-bold px-4 py-2 rounded transition flex items-center gap-2`}
                  >
                    {hasBorrowed ? (
                      <>
                        <BookOpenIcon className="w-5 h-5" />
                        Read Now
                      </>
                    ) : (
                      <>
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Pinjam
                      </>
                    )}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
