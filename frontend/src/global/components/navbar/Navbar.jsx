import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="w-full">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gray-900 text-white w-full px-4 py-4 items-center">
            <div className="flex items-center space-x-12">
              <a className="text-3xl font-bold font-heading" href="#">
                Logo Here.
              </a>
              <ul className="hidden md:flex space-x-8 font-semibold font-heading">
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Category
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Collections
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-200" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Right side buttons & icons */}
            <div className="flex items-center space-x-6">
              {/* Icons - hidden on small screens */}
              <div className="hidden xl:flex items-center space-x-5">
                <a className="hover:text-gray-200" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </a>
                <a
                  className="relative flex items-center hover:text-gray-200"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="flex absolute -top-2 -right-2">
                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-pink-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                  </span>
                </a>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 transition"
                >
                  Sign Up
                </Link>
              </div>

              {/* Mobile menu icons */}
              <div className="xl:hidden flex items-center space-x-4">
                <a href="#" className="hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
