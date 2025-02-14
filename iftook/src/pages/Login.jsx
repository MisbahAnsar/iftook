import React, { useState } from "react";
import { loginUser } from "../utils/api"; // Correct import
import { useNavigate } from "react-router-dom";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await loginUser(email, password);
    setLoading(false);

    console.log("response", response.user.role);

    if (response.success) {
        if (response.user.role === "admin") {
          onLoginSuccess(); // Notify App.js about successful login
          navigate("/"); // Redirect admin to homepage
        } else {
          setError("Access denied. Only admins can log in.");
          localStorage.removeItem("token"); // Remove token if not admin
        }
      } else {
        setError(response.message);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg">
          <h2 className="text-white text-center text-xl font-semibold">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-4 bg-gray-800 border border-gray-700 text-white rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-4 bg-gray-800 border border-gray-700 text-white rounded-md"
          />

          <button
            type="submit"
            className={`w-full mt-4 p-2 bg-pink-600 hover:bg-pink-500 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
