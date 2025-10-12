import React from "react";
import heroImage from "../assets/about.png"; // optional image for visual storytelling

const AboutUs = () => {
  return (
    <div className="bg-[#FFF8E7] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Our Story */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6B3E26] mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4 text-justify">
            Meet Sushma, a dedicated housewife who decided to turn her passion
            for homemade pickles into her very first business. With love, care,
            and traditional recipes passed down through generations, she started
            creating pickles that reminded everyone of the warmth of home. What
            began in her kitchen is now Amma’s Pickles – a brand that stands for
            authenticity, quality, and the magic of homemade flavors.
          </p>
          <p className="text-gray-700 mb-4 text-justify">
            Every jar tells a story of hard work, courage, and the determination
            of a woman who wanted to make a difference. Her journey is not just
            about pickles; it’s about embracing new challenges and turning dreams
            into reality.
          </p>
        </div>

        {/* Optional Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Homemade Pickles"
            className="rounded-2xl shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Our Aim / Women Empowerment */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6B3E26] mb-6">
          Our Aim
        </h2>
        <p className="text-gray-700 mb-4 text-lg">
          At Amma’s Pickles, our aim goes beyond making delicious pickles. We
          believe in empowering women by providing them opportunities to turn
          their skills and passion into sustainable livelihoods. Every order
          you make supports women like Sushma to build their businesses, gain
          financial independence, and inspire a generation of strong,
          ambitious women.
        </p>
        <p className="text-gray-700 text-lg">
          By choosing Amma’s Pickles, you’re not just enjoying the taste of
          home, you’re helping us create a world where every woman has the
          confidence and support to chase her dreams.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
