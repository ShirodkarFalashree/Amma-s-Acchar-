import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import pickleData from "../data/productDetails.js"; // ❌ REMOVE: No longer needed

// Define your base API URL
const API_BASE_URL = "http://localhost:3000"; // Adjust port if necessary

const Products = () => {
  const navigate = useNavigate();
  // 1. State to hold the fetched products
  const [acharList, setAcharList] = useState([]);
  // 2. State for loading/error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchar = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/achar`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Assuming the API returns: { success: true, acharList: [...] }
        setAcharList(data.acharList);
        setError(null);

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please check the server connection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchar();
  }, []); // The empty dependency array ensures this runs only once on mount

  // --- Rendering Logic ---

  if (isLoading) {
    return (
      <div className="bg-[#FFF8E7] min-h-screen py-10 px-5 text-center text-xl font-semibold text-gray-600">
        Loading delicious pickles... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FFF8E7] min-h-screen py-10 px-5 text-center text-xl font-semibold text-red-600">
        Error: {error}
      </div>
    );
  }

  if (acharList.length === 0) {
    return (
      <div className="bg-[#FFF8E7] min-h-screen py-10 px-5 text-center text-xl font-semibold text-gray-600">
        No products found. Admin needs to add some achar! 🌶️
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-10 px-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Pickles Collection
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {/* 3. Map over the fetched state data (acharList) */}
        {acharList.map((pickle) => (
          // IMPORTANT: Use pickle._id (from MongoDB) as the key and for navigation
          <div
            key={pickle._id} 
            onClick={() => navigate(`/products/${pickle._id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-5 w-64 hover:scale-105 transform transition duration-300"
          >
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              {/* Ensure you check if images exist before trying to access index 0 and 1 */}
              {pickle.images && pickle.images[0] && (
                <img
                  src={pickle.images[0]}
                  alt={pickle.name}
                  // Show first image by default, hide on hover
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-100 hover:opacity-0"
                />
              )}
              {pickle.images && pickle.images[1] && (
                <img
                  src={pickle.images[1]}
                  alt={pickle.name}
                  // Hide second image by default, show on hover
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
                />
              )}
              {/* Fallback for no image */}
              {(!pickle.images || pickle.images.length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              {pickle.name}
            </h3>
            <p className="text-gray-600 mb-1 text-center">₹{pickle.price}</p>
            <p className="text-yellow-500 font-medium text-center">
              ⭐ {pickle.rating ? pickle.rating.toFixed(1) : 'No Rating'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;