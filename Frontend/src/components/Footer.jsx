import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";

const API_BASE_URL = "https://amma-s-acchar.onrender.com"; 

const Footer = () => {
  const navigate = useNavigate(); 
  
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAdminLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        username,
        password,
      });
      
      const adminId = data.adminData.id;
      localStorage.setItem("adminId", adminId);
      
      setSuccess("Login successful! Redirecting...");
      setIsLoggedIn(true); 

      setShowAdminModal(false); 
      
      // Navigate and scroll to top after successful login
      window.scrollTo(0, 0); // 👈 SCROLL TO TOP FOR FRESH VIEW
      window.location.href = "/admin"; 

    } catch (err) {
      localStorage.removeItem("adminId");
      setIsLoggedIn(false);
      setError(err.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    setIsLoggedIn(false);
    navigate('/'); 
    window.location.reload(); 
  };

  // Conditional rendering for the Admin section
  const AdminControls = () => {
    if (isLoggedIn) {
      return (
        <li className="mt-2 space-y-2">
          {/* Dashboard Button */}
          <Link
            to="/admin"
            // Scroll to top when clicking the link
            onClick={() => window.scrollTo(0, 0)} // 👈 SCROLL TO TOP ON CLICK
            className="inline-block cursor-pointer bg-[#D97706] text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition w-full text-center"
          >
            Go to Admin Dashboard
          </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-block cursor-pointer bg-gray-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-600 transition w-full text-center"
          >
            Logout
          </button>
        </li>
      );
    }

    return (
      <li className="mt-2">
        <button
          onClick={() => {
            setShowAdminModal(true);
            setError("");
            setSuccess("");
            setUsername("");
            setPassword("");
          }}
          className="inline-block cursor-pointer bg-yellow-500 text-[#5C4533] px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
        >
          Admin Login
        </button>
      </li>
    );
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
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#D97706] transition-colors">Home</Link></li>
            <li><Link to="/products" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#D97706] transition-colors">Our Pickles</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#D97706] transition-colors">Our Story</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#D97706] transition-colors">Contact Us</Link></li>
            {/* Admin Controls Rendered Here */}
            <AdminControls /> 
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
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-80 relative shadow-lg">
            <button
              className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
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
              className="w-full cursor-pointer bg-yellow-500 text-[#5C4533] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
            {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;