import React from "react";
import { useParams } from "react-router-dom";
import pickleData from "../data/productDetails.js";

const ProductDetails = () => {
  const { id } = useParams();
  const product = pickleData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-10 text-gray-600">Product not found</div>;
  }

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-10 px-6 lg:px-20">
      {/* Product title */}
      <h2 className="text-4xl font-bold text-[#6B3E26] mb-6">{product.name}</h2>

      {/* Image gallery */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="rounded-xl object-cover w-full h-40 md:h-52"
            />
          ))}
        </div>

        {/* Price + buy section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            ₹{product.price}
          </h3>
          <p className="text-yellow-500 mb-2">⭐ {product.rating} Rating</p>
          <select className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-full">
            {product.quantity.map((q) => (
              <option key={q}>{q} kg</option>
            ))}
          </select>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition">
            Buy Now
          </button>
          <button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
            Add to Cart
          </button>
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
          {product.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* Testimonials */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-[#6B3E26] mb-4">
          What Our Customers Say
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {product.testimonials.map((review, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              <p className="font-medium">“{review.text}”</p>
              <p className="text-sm text-gray-600 mt-2">
                - {review.name} ⭐{"⭐".repeat(review.rating - 1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h3 className="text-2xl font-semibold text-[#6B3E26] mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {product.faqs.map((faq, index) => (
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
