import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShoppingCart } from "lucide-react"; // uses lucide-react for the cart icon

const Navbar = () => {
  return (
    <nav className="bg-[#FFF8E7] shadow-sm py-4 px-8 flex items-center font-special justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <span className="text-2xl font-semibold font-logo text-[#6B3E26]">Amma’s Pickles</span>
      </div>

      {/* Links */}
      <div className="flex space-x-10 text-lg font-medium text-[#6B3E26]">
        <Link
          to="/"
          className="relative group"
        >
          Home
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          to="/products"
          className="relative group"
        >
          Pickles
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          to="/about"
          className="relative group"
        >
          Our Story
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D97706] group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>

      {/* Cart Icon */}
      <div className="text-[#6B3E26] hover:text-[#D97706] cursor-pointer transition-colors">
        <ShoppingCart size={26} />
      </div>
    </nav>
  );
};

export default Navbar;
