import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import axios from 'axios';
// import pickleData from '../data/productDetails.js'; // ❌ REMOVE: No longer needed
import { Loader } from 'lucide-react';

const API_BASE_URL = "http://localhost:3000";

const TopRated = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [acharList, setAcharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchar = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/achar`);
        
        if (response.data.success) {
          setAcharList(response.data.acharList);
          setError(null);
        } else {
          throw new Error(response.data.message || "Failed to fetch product list.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Could not load top products. Server connection failed.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchar();
  }, []);

  // Sort and slice the fetched list
  const topPickles = [...acharList]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // --- Rendering Logic ---

  if (loading) {
    return (
      <div className="bg-[#FFF8E7] py-10 px-5 text-center">
        <Loader className="animate-spin text-[#6B3E26] w-6 h-6 mx-auto mb-2" />
        <p className="text-gray-600">Loading Top Pickles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FFF8E7] py-10 px-5 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }
  
  if (topPickles.length === 0) {
    return (
      <div className="bg-[#FFF8E7] py-10 px-5 text-center text-gray-600 font-semibold">
        No products available to display.
      </div>
    );
  }


  return (
    <div className="bg-[#FFF8E7] py-10 px-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Top Rated Pickles
      </h2>

      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {topPickles.map((pickle) => (
          <div
            key={pickle._id} // 👈 Use MongoDB _id as key
            onClick={() => navigate(`/products/${pickle._id}`)} // 👈 Navigate to product detail page
            className="cursor-pointer bg-white rounded-2xl shadow-md p-5 w-64 hover:scale-105 transform transition duration-300"
          >
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              {/* Image handling: Check if images array exists */}
              {pickle.images && pickle.images[0] && (
                <img
                  src={pickle.images[0]}
                  alt={pickle.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-100 hover:opacity-0"
                />
              )}
              {pickle.images && pickle.images[1] && (
                <img
                  src={pickle.images[1]}
                  alt={pickle.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
                />
              )}
              {(!pickle.images || pickle.images.length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500 text-sm">No Image</div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              {pickle.name}
            </h3>
            <p className="text-gray-600 mb-1 text-center">Price: ₹{pickle.price}</p>
            <p className="text-yellow-500 font-medium text-center">
              Rating: {pickle.rating ? pickle.rating.toFixed(1) : 'N/A'} ⭐
            </p>
          </div>
        ))}
      </div>

      {/* View All Products Button (Uses theme colors) */}
      <div className="flex justify-center">
        <Link
          to="/products"
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-600 transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default TopRated;