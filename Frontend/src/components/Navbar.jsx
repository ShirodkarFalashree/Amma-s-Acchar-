import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShoppingCart, Menu, X } from "lucide-react"; 
import axios from "axios";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchOrder = async () => {
    if (!phone) return;
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const { data } = await axios.get(`http://localhost:3000/api/orders/${phone}`);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || "Order not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-[#FFF8E7] shadow-sm py-4 px-6 md:px-8 flex items-center justify-between font-special relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 md:h-14 w-auto" />
          <span className="text-xl md:text-2xl font-semibold font-logo text-[#6B3E26]">Amma’s Pickles</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 text-lg font-medium text-[#6B3E26]">
          <Link to="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/products" className="relative group">
            Pickles
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" className="relative group">
            Our Story
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div
            className="text-[#6B3E26] hover:text-[#D97706] cursor-pointer transition-colors"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart size={24} />
          </div>
          <div className="md:hidden cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-[#FFF8E7] shadow-md flex flex-col items-center py-4 space-y-3 md:hidden z-20">
            <Link to="/" onClick={() => setMobileMenu(false)} className="text-[#6B3E26] font-medium text-lg">Home</Link>
            <Link to="/products" onClick={() => setMobileMenu(false)} className="text-[#6B3E26] font-medium text-lg">Pickles</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)} className="text-[#6B3E26] font-medium text-lg">Our Story</Link>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Check Your Order</h2>

            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
            />

            <button
              onClick={fetchOrder}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              {loading ? "Fetching..." : "Fetch Order"}
            </button>

            {/* Error */}
            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

            {/* Order Display */}
            {order && (
              <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50 max-h-60 overflow-auto">
                <h3 className="font-semibold mb-2">Your Order:</h3>
                <pre className="text-sm">{JSON.stringify(order, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
