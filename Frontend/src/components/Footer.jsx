import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#5C4533] text-white py-12 font-special">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Amma's Pickles Logo" className="h-14 w-auto" />
            <span className="text-2xl font-semibold">Amma’s Pickles</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Handcrafted with love, just like Amma makes it. Taste the tradition passed down through generations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-4 border-b-2 border-[#D97706] pb-2">Explore</h4>
          <ul className="space-y-2 text-md">
            <li><Link to="/" className="hover:text-[#D97706] transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#D97706] transition-colors">Our Pickles</Link></li>
            <li><Link to="/about" className="hover:text-[#D97706] transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-[#D97706] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1">
          <h4 className="text-xl font-bold mb-4 border-b-2 border-[#D97706] pb-2">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="h-6 w-6 hover:text-[#D97706] transition-colors" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Amma’s Pickles. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;  