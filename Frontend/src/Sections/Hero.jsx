import React from "react";
import image from "../assets/heroNew.png";

const Hero = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Maa ke Haath ka Magic
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
          Homemade pickles made with love, warmth, and tradition.
        </p>
      </div>
    </div>
  );
};

export default Hero;
