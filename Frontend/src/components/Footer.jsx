import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";

const Footer = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAdminLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post("http://localhost:3000/api/admin/login", {
        username,
        password,
      });
      setSuccess("Login successful!");
      console.log("Admin login response:", data);
      // You can redirect admin or store token here
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#5C4533] text-white py-12 font-special relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Amma's Pickles Logo" className="h-14 w-auto" />
            <span className="text-2xl font-semibold">Amma’s Pickles</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Handcrafted with love, just like Amma makes it. Taste the tradition passed down through generations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-4 border-b-2 border-[#D97706] pb-2">Explore</h4>
          <ul className="space-y-2 text-md">
            <li><Link to="/" className="hover:text-[#D97706] transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#D97706] transition-colors">Our Pickles</Link></li>
            <li><Link to="/about" className="hover:text-[#D97706] transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-[#D97706] transition-colors">Contact Us</Link></li>
            {/* Admin Login Button */}
            <li className="mt-2">
              <button
                onClick={() => setShowAdminModal(true)}
                className="inline-block bg-yellow-500 text-[#5C4533] px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
              >
                Admin Login
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-4 border-b-2 border-[#D97706] pb-2">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Amma’s Pickles. All rights reserved.
      </div>

      {/* Admin Login Modal */}
      // ... other code ...

{showAdminModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowAdminModal(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black placeholder-gray-500"
        />

        <button
          onClick={handleAdminLogin}
          className="w-full bg-yellow-500 text-[#5C4533] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
      </div>
    </div>
  )}

// ... other code ...
    </footer>
  );
};

export default Footer;
