import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import axios from 'axios';
import BuyNowModal from "../components/BuyNowModal";

const API_BASE_URL = "https://amma-s-acchar.onrender.com"; 

const ProductDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Initialize useNavigate
  
  const [product, setProduct] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // 👈 New state for admin check
  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching and Admin Check ---
  useEffect(() => {
    // Check admin status immediately
    if (localStorage.getItem('adminId')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    
    const fetchProduct = async () => {
      try {
        // NOTE: Still fetching all and filtering, but efficient way would be a dedicated /api/achar/:id endpoint
        const response = await axios.get(`${API_BASE_URL}/api/achar`);
        const foundProduct = response.data.acharList.find((p) => p._id === id);

        if (!foundProduct) {
             throw new Error("Product not found in the list.");
        }

        setProduct(foundProduct);
        setError(null);

      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("Could not load product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- Utility Functions ---

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };
  
  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };
  
  // 👈 NEW: Handle Delete Pickle Function
  const handleDeletePickle = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete the pickle "${product.name}"? This cannot be undone.`)) {
      return;
    }

    try {
      setIsLoading(true); // Show loading state during deletion
      // You must implement the DELETE /api/achar/:id endpoint in your backend!
      await axios.delete(`${API_BASE_URL}/api/achar/${id}`); 
      
      alert(`Pickle "${product.name}" deleted successfully!`);
      navigate('/products'); // Redirect to the main products page

    } catch (err) {
      console.error("Failed to delete pickle:", err);
      alert(`Error deleting pickle: ${err.response?.data?.message || "Check server implementation for DELETE /api/achar/:id"}`);
      setIsLoading(false); // Hide loading on failure
    }
  };

  // --- Rendering Logic ---

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading details...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-10 text-red-600">Error: {error || "Product not found."}</div>;
  }
  
  const maxOrderQuantity = 10; 
  const availableStock = product.quantity;
  const quantityOptions = [];
  const limit = Math.min(maxOrderQuantity, availableStock);
  for (let i = 1; i <= limit; i++) {
    quantityOptions.push(i);
  }

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-10 px-6 lg:px-20">
      {isModalOpen && (
        <BuyNowModal 
          product={product} 
          selectedQuantity={selectedQuantity} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* Product title */}
      <h2 className="text-4xl font-bold text-[#6B3E26] mb-6">{product.name}</h2>

      {/* Image gallery */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {product.images && product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="rounded-xl object-cover w-full h-40 md:h-52"
            />
          ))}
        </div>

        {/* Price + Action section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            ₹{product.price}
          </h3>
          <p className="text-yellow-500 mb-2">⭐ {product.rating} Rating</p>
          
          {/* Conditional Admin/User Controls */}
          {isAdmin ? (
            // --- ADMIN VIEW ---
            <div className="space-y-3 mt-4">
              <p className="text-lg font-bold text-red-600">ADMIN MODE ACTIVE</p>
              <button 
                onClick={handleDeletePickle} 
                className="w-full bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                disabled={isLoading}
              >
                DELETE PICKLE
              </button>
              <button 
                onClick={() => navigate('/admin')} 
                className="w-full bg-gray-500 cursor-pointer hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Go to Admin Dashboard
              </button>
            </div>
          ) : (
            // --- USER VIEW ---
            <>
              {/* 2. Dynamic Quantity Dropdown */}
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full"
                value={selectedQuantity}
                onChange={handleQuantityChange}
              >
                {quantityOptions.map((q) => (
                  <option key={q} value={q}>
                    {q} {q === 1 ? 'Jar' : 'Jars'}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mb-4">
                Stock available: {availableStock} {availableStock > 0 ? '' : '(Out of Stock)'}
              </p>

              {/* 3. Buy Now Button triggers the Modal */}
              <button 
                onClick={handleBuyNowClick} 
                className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
                disabled={availableStock === 0}
              >
                Buy Now (Total: ₹{product.price * selectedQuantity})
              </button>
              
              <button className="w-full cursor-pointer mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
                Contact for details
              </button>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 text-lg">{product.description}</p>

      {/* Features */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-[#6B3E26] mb-3">
          What this pickle offers
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-gray-700">
          {product.features && product.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* FAQs */}
      <div>
        <h3 className="text-2xl font-semibold text-[#6B3E26] mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {product.faqs && product.faqs.map((faq, index) => (
            <details key={index} className="bg-white shadow-sm rounded-lg p-3">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                {faq.q}
              </summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;