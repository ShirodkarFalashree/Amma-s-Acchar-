import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/heroNew.png";

const Hero = () => {
  return (
    <div
      className="
        relative 
        h-[90vh] sm:h-[95vh] md:h-screen 
        bg-cover bg-center 
        flex items-center justify-center text-white
      "
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-4 md:px-0 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-special">
          Maa ke Haath ka Magic
        </h1>
        <p className="text-sm sm:text-base md:text-xl mb-6 drop-shadow-md">
          Homemade pickles crafted with love, warmth, and tradition. Every jar carries the taste of home and nostalgia.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link
            to="/products"
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-600 transition"
          >
            View All Products
          </Link>
          <Link
            to="#about"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Learn More
          </Link>
        </div>

        {/* Homely tagline */}
        <p className="mt-6 text-sm sm:text-base md:text-lg italic drop-shadow-md">
          “Taste the love, savor the tradition, and bring a piece of home to your table.”
        </p>
      </div>
    </div>
  );
};

export default Hero;
