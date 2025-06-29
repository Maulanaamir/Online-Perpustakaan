import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ state loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ mulai loading

    try {
      const userData = await login(credentials);
      console.log("🧠 userData setelah login:", userData);

      if (userData?.role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      setError("Login gagal. Cek email/password.");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
