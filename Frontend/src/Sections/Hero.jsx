// import React from "react";
// import { Link } from "react-router-dom";
// import image from "../assets/heroNew.png";

// const Hero = () => {
//   return (
//    <div
//   className="
//     relative 
//     h-[90vh] sm:h-[95vh] md:h-screen 
//     bg-cover bg-center 
//     flex items-center justify-start text-white
//   "
//   style={{ backgroundImage: `url(${image})` }}
// >
//   <div className="absolute inset-0 bg-black/60"></div>

//   <div className="relative z-10 text-left pl-6 mt-15 sm:pl-10 md:pl-16">
//     <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-special">
//       Maa ke Haath ka Magic
//     </h1>
//     <p className="text-sm sm:text-base md:text-xl mb-6 drop-shadow-md">
//       Homemade pickles crafted with love, warmth, and tradition. Every jar carries the taste of home and nostalgia.
//     </p>

//     <div className="flex flex-col sm:flex-row gap-4 mt-4">
//       <Link
//         to="/products"
//         className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-600 transition"
//       >
//         View All Products
//       </Link>
//       <Link
//         to="#about"
//         className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
//       >
//         Learn More
//       </Link>
//     </div>

//     <p className="mt-6 text-sm sm:text-base md:text-lg italic drop-shadow-md">
//       “Taste the love, savor the tradition, and bring a piece of home to your table.”
//     </p>
//   </div>
// </div>

//   );
// };

// export default Hero;


// import React from "react";
// import { Link } from "react-router-dom";
// import image from "../assets/heroNew.png";

// const Hero = () => {
//   return (
//     <div
//       className="
//         relative 
//         h-[85vh] sm:h-[90vh] md:h-screen 
//         bg-cover bg-center 
//         flex items-center justify-start 
//         text-white
//       "
//       style={{ backgroundImage: `url(${image})` }}
//     >
//       {/* Overlay for readability */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Text content */}
//       <div
//         className="
//           relative z-10 text-left 
//           px-4 sm:pl-8 md:pl-16 
//           max-w-[90%] sm:max-w-[70%] lg:max-w-[50%]
//         "
//       >
//         <h1
//           className="
//             text-3xl sm:text-4xl md:text-6xl 
//             font-bold mb-3 sm:mb-4 
//             drop-shadow-lg font-special leading-tight
//           "
//         >
//           Maa ke Haath ka Magic
//         </h1>

//         <p
//           className="
//             text-sm sm:text-base md:text-xl 
//             mb-6 drop-shadow-md leading-relaxed
//           "
//         >
//           Homemade pickles crafted with love, warmth, and tradition. Every jar
//           carries the taste of home and nostalgia.
//         </p>

//         {/* Buttons */}
//         <div
//           className="
//             flex flex-col sm:flex-row 
//             gap-3 sm:gap-4 
//             mt-4 sm:mt-6
//           "
//         >
//           <Link
//             to="/products"
//             className="
//               bg-yellow-500 text-white 
//               px-5 sm:px-6 py-2.5 sm:py-3 
//               rounded-xl font-semibold 
//               shadow-md hover:bg-yellow-600 transition
//               text-center
//             "
//           >
//             View All Products
//           </Link>

//           <Link
//             to="#about"
//             className="
//               bg-transparent border-2 border-white 
//               text-white px-5 sm:px-6 py-2.5 sm:py-3 
//               rounded-xl font-semibold 
//               hover:bg-white hover:text-black transition
//               text-center
//             "
//           >
//             Learn More
//           </Link>
//         </div>

//         {/* Tagline */}
//         <p
//           className="
//             mt-5 sm:mt-6 
//             text-xs sm:text-sm md:text-lg 
//             italic drop-shadow-md
//           "
//         >
//           “Taste the love, savor the tradition, and bring a piece of home to your
//           table.”
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/heroNew.png";

const Hero = () => {
  return (
    <div
      // Main container changes:
      // Centering content for mobile (justify-center)
      // and aligning to start for md and up (md:justify-start)
      className="
        relative 
        h-[85vh] sm:h-[90vh] md:h-screen 
        bg-cover bg-center 
        flex items-center 
        justify-center md:justify-start 
        text-white
      "
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text content */}
      <div
        // Content container changes:
        // Text is centered on mobile (text-center), left-aligned for md and up (md:text-left)
        // Set a max-width that makes the content look better when centered on small screens
        // Adjust padding to work with centered content on mobile
        className="
          relative z-10 
          text-center md:text-left 
          px-6 sm:px-8 md:pl-16 
          max-w-[90%] sm:max-w-[60%] lg:max-w-[50%]
        "
      >
        <h1
          className="
            text-3xl sm:text-4xl md:text-6xl 
            font-bold mb-3 sm:mb-4 
            drop-shadow-lg font-special leading-tight
          "
        >
          Maa ke Haath ka Magic
        </h1>

        <p
          className="
            text-sm sm:text-base md:text-xl 
            mb-6 drop-shadow-md leading-relaxed
          "
        >
          Homemade pickles crafted with love, warmth, and tradition. Every jar
          carries the taste of home and nostalgia.
        </p>

        {/* Buttons */}
        <div
          // Button container changes:
          // Center the buttons horizontally on mobile (mx-auto)
          // Adjust max-width so buttons don't stretch too wide on small centered content
          // On small and up screens, it switches to a row layout and aligns to the start for larger screens
          className="
            flex flex-col sm:flex-row 
            gap-3 sm:gap-4 
            mt-4 sm:mt-6
            max-w-xs mx-auto md:mx-0 md:justify-start
          "
        >
          <Link
            to="/products"
            className="
              bg-yellow-500 text-white 
              px-5 sm:px-4 py-2.5 sm:py-3 
              rounded-xl font-semibold 
              shadow-md hover:bg-yellow-600 transition
              text-center 

            "
          >
            View All Products
          </Link>

          <Link
            to="#about"
            className="
              bg-transparent border-2 border-white 
              text-white px-5 sm:px-6 py-2.5 sm:py-3 
              rounded-xl font-semibold 
              hover:bg-white hover:text-black transition
              text-center
            "
          >
            Learn More
          </Link>
        </div>

        {/* Tagline */}
        <p
          className="
            mt-5 sm:mt-6 
            text-xs sm:text-sm md:text-lg 
            italic drop-shadow-md
          "
        >
          “Taste the love, savor the tradition, and bring a piece of home to your
          table.”
        </p>
      </div>
    </div>
  );
};

export default Hero;