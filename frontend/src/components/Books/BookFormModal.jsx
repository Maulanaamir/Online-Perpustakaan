// src/components/Books/BookFormModal.jsx
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "../../services/api";

const animatedComponents = makeAnimated();

export default function BookFormModal({ isOpen, onClose, categories, book, onRefresh }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    categories: [],
    file: null,
    cover: null,
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        categories: book.categories?.map((c) => c.id.toString()) || [],
        file: null,
        cover: null,
      });
    } else {
      setForm({
        title: "",
        author: "",
        categories: [],
        file: null,
        cover: null,
      });
    }
  }, [book]);

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

    if (book?.id) {
      await axios.post(`/books/${book.id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    onClose();
    onRefresh();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  {book ? "Edit Buku" : "Tambah Buku"}
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
                      required={!book}
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
                      onClick={onClose}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {book ? "Update" : "Tambah"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
