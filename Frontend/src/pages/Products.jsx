import { useNavigate } from "react-router-dom";
import React from "react";
import pickleData from "../data/productDetails.js";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-10 px-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Pickles Collection
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {pickleData.map((pickle) => (
          <div
            key={pickle.id}
            onClick={() => navigate(`/products/${pickle.id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-5 w-64 hover:scale-105 transform transition duration-300"
          >
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
              <img
                src={pickle.images[0]}
                alt={pickle.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-100 hover:opacity-0"
              />
              <img
                src={pickle.images[1]}
                alt={pickle.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
              {pickle.name}
            </h3>
            <p className="text-gray-600 mb-1 text-center">₹{pickle.price}</p>
            <p className="text-yellow-500 font-medium text-center">
              ⭐ {pickle.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
