import React, { useEffect, useState, Fragment } from "react";
import axios from "../../services/api";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    categories: [],
    file: null,
    cover: null,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const [resBooks, resCats] = await Promise.all([
      axios.get("/books"),
      axios.get("/categories"),
    ]);
    setBooks(resBooks.data);
    setCategories(resCats.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (book = null) => {
    setIsOpen(true);
    if (book) {
      setEditingId(book.id);
      setForm({
        title: book.title,
        author: book.author,
        categories: book.categories?.map((c) => c.id.toString()) || [],
        file: null,
        cover: null,
      });
    } else {
      setEditingId(null);
      setForm({
        title: "",
        author: "",
        categories: [],
        file: null,
        cover: null,
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setForm({
      title: "",
      author: "",
      categories: [],
      file: null,
      cover: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" || name === "cover") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    form.categories.forEach((id) => formData.append("categories[]", id));
    if (form.file) formData.append("file", form.file);
    if (form.cover) formData.append("cover", form.cover);

    if (editingId) {
      await axios.post(`/books/${editingId}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    closeModal();
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus buku ini?")) return;
    await axios.delete(`/books/${id}`);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Buku</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Tambah Buku
        </button>
      </div>

      <table className="w-full mt-4 border rounded overflow-hidden text-left">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-700 uppercase">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Cover</th>
            <th className="p-3 border">Judul</th>
            <th className="p-3 border">Penulis</th>
            <th className="p-3 border">Kategori</th>
            <th className="p-3 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, idx) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="p-3 border">{idx + 1}</td>
              <td className="p-3 border">
                {b.cover_path ? (
                  <img
                    src={`http://localhost:8000/storage/${b.cover_path}`}
                    alt="cover"
                    className="w-12 h-16 object-cover rounded shadow"
                  />
                ) : (
                  <span>-</span>
                )}
              </td>
              <td className="p-3 border">{b.title}</td>
              <td className="p-3 border">{b.author}</td>
              <td className="p-3 border text-sm text-gray-700">
                {b.categories?.length > 0
                  ? b.categories.map((cat) => cat.name).join(", ")
                  : "-"}
              </td>
              <td className="p-3 border text-center space-x-2">
                <button
                  onClick={() => openModal(b)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded shadow-xl">
                  <Dialog.Title className="text-xl font-semibold mb-4">
                    {editingId ? "Edit Buku" : "Tambah Buku"}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-medium mb-1">Judul Buku</label>
                      <input
                        type="text"
                        name="title"
                        className="w-full border px-3 py-2 rounded"
                        value={form.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Penulis</label>
                      <input
                        type="text"
                        name="author"
                        className="w-full border px-3 py-2 rounded"
                        value={form.author}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Kategori</label>
                      <Select
                        isMulti
                        components={animatedComponents}
                        options={categories.map((cat) => ({
                          value: cat.id.toString(),
                          label: cat.name,
                        }))}
                        value={categories
                          .filter((cat) =>
                            form.categories.includes(cat.id.toString())
                          )
                          .map((cat) => ({
                            value: cat.id.toString(),
                            label: cat.name,
                          }))}
                        onChange={(selected) =>
                          setForm({
                            ...form,
                            categories: selected.map((s) => s.value),
                          })
                        }
                        className="text-sm"
                        classNamePrefix="react-select"
                        placeholder="Pilih kategori..."
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">File Buku</label>
                      <input
                        type="file"
                        name="file"
                        accept=".pdf,.epub"
                        className="w-full border px-3 py-2 rounded bg-white"
                        onChange={handleChange}
                        required={!editingId}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">Cover Buku</label>
                      <input
                        type="file"
                        name="cover"
                        accept="image/*"
                        className="w-full border px-3 py-2 rounded bg-white"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={closeModal}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {editingId ? "Update" : "Tambah"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
