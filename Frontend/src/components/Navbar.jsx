import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShoppingCart, Menu, X, Package } from "lucide-react"; // Added Package icon
import axios from "axios";

// Define base URL for clarity and easy maintenance
const API_BASE_URL = "http://localhost:3000";

const Navbar = () => {
  // Renaming 'showCart' to 'showOrderLookup' for better clarity
  const [showOrderLookup, setShowOrderLookup] = useState(false);
  const [phone, setPhone] = useState("");
  // 'order' now holds the successful response data object: { success: true, orders: [...] }
  const [orderData, setOrderData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchOrder = async () => {
    if (!phone) {
      setError("Please enter a phone number.");
      return;
    }
    setLoading(true);
    setError("");
    setOrderData(null); // Reset previous order data

    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/orders/${phone}`);
      
      if (data.orders && data.orders.length > 0) {
        setOrderData(data);
        setError(""); // Clear error on success
      } else {
         setError("No orders found for this number.");
      }

    } catch (err) {
      // Check for 404 (No orders found) vs other errors
      const message = err.response?.data?.message || "Could not connect to server.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-[#FFF8E7] shadow-sm py-4 px-6 md:px-8 flex items-center justify-between font-special relative">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={logo} alt="Logo" className="h-12 md:h-14 w-auto" />
          <span className="text-xl md:text-2xl font-semibold font-logo text-[#6B3E26]">Amma’s Pickles</span>
        </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 text-lg font-medium text-[#6B3E26]">
          <Link to="/" className="relative group">Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/products" className="relative group">Pickles
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" className="relative group">Our Story
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div
            className="text-[#6B3E26] hover:text-[#D97706] cursor-pointer transition-colors"
            onClick={() => setShowOrderLookup(true)}
            title="Check Your Orders"
          >
            <ShoppingCart size={24} /> {/* Using ShoppingCart to represent 'My Orders' lookup */}
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

      {/* Order Lookup Modal (Formerly Cart Modal) */}
      {showOrderLookup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowOrderLookup(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Check Your Past Orders</h2>

            <input
              // Changed type to 'tel' for mobile input optimization
              type="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
              pattern="[0-9]{10}" // Optional: Add a simple pattern for 10 digits
            />

            <button
              onClick={fetchOrder}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:bg-gray-400"
              disabled={loading || !phone}
            >
              {loading ? "Fetching..." : "Fetch Orders"}
            </button>

            {/* Error */}
            {error && <p className="text-red-500 mt-3 text-center text-sm">{error}</p>}

            {/* Order Display */}
            {orderData && orderData.orders && (
              <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50 max-h-60 overflow-auto">
                <h3 className="font-semibold mb-3 text-lg">
                  Found {orderData.orders.length} Orders:
                </h3>
                
                {orderData.orders.map((order, orderIndex) => (
                  <div key={order._id} className="mb-4 border-b pb-3 last:border-b-0">
                    <p className="text-xs text-gray-500 mb-1">
                      Order Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    {order.acharDetails.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <Package size={18} className="text-[#6B3E26]" />
                        <span className="font-medium text-gray-800">
                          {item.name} 
                        </span>
                        <span className="text-sm text-gray-600">
                          ({item.selectedQuantity} Jars @ ₹{item.priceAtOrder})
                        </span>
                        <span className="ml-auto font-bold text-green-700">
                          Total: ₹{item.priceAtOrder * item.selectedQuantity}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;