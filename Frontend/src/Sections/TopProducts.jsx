import React from 'react';
import { Link } from 'react-router-dom';
import pickleData from '../data/productDetails.js';

const TopRated = () => {
  const topPickles = [...pickleData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="bg-[#FFF8E7] py-10 px-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Top Rated Pickles
      </h2>

      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {topPickles.map((pickle) => (
          <div
            key={pickle.id}
            className="bg-white rounded-2xl shadow-md p-5 w-64 hover:scale-105 transform transition duration-300"
          >
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              {/* Default image */}
              <img
                src={pickle.images[0]}
                alt={pickle.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-100 hover:opacity-0"
              />
              {/* Hover image */}
              <img
                src={pickle.images[1]}
                alt={pickle.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              {pickle.name}
            </h3>
            <p className="text-gray-600 mb-1 text-center">Price: ₹{pickle.price}</p>
            <p className="text-yellow-500 font-medium text-center">
              Rating: {pickle.rating} ⭐
            </p>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
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
