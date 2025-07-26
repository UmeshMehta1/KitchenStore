import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 md:px-16 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">KitchenStore</h2>
          <p className="text-sm text-gray-400">
            Your one-stop destination for premium kitchen essentials and
            utensils.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>Email: support@kitchenstore.com</li>
            <li>Phone: +977-9800000000</li>
            <li>Location: Itahari, Nepal</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook-f">📘</i>
            </a>
            <a href="#" className="hover:text-sky-400">
              <i className="fab fa-twitter">🐦</i>
            </a>
            <a href="#" className="hover:text-pink-400">
              <i className="fab fa-instagram">📸</i>
            </a>
            <a href="#" className="hover:text-red-500">
              <i className="fab fa-youtube">▶️</i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} KitchenStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
