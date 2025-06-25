import { useState } from 'react';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError('Pendaftaran gagal. Email mungkin sudah digunakan.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-96"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Nama Lengkap"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-6 p-3 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Daftar
      </button>
      <p className="text-sm mt-4 text-center">
        Sudah punya akun? <a href="/login" className="text-blue-600 underline">Login</a>
      </p>
    </form>
  );
}
