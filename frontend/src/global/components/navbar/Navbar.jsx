import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchToCart } from "../../../store/cartSlice";
import { logOut } from "../../../store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { item: user } = useSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchToCart());
  }, [dispatch]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <div className="mt-1 px-2 md:px-8">
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-gray-900/90 backdrop-blur"
        } rounded-lg border border-gray-700/50`}
      >
        <section className="relative mx-auto max-w-7xl">
          <nav className="flex justify-between text-white w-full px-6 py-4 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-12">
              <Link
                to="/"
                className="text-3xl font-bold font-heading bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-300 hover:to-purple-300 transition-all duration-300"
              >
                🍳 KitchenStore
              </Link>

              {/* Desktop Navigation */}
              <ul className="hidden lg:flex space-x-8 font-semibold font-heading">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative px-3 py-2 rounded-md transition-all duration-300 hover:text-pink-300 ${
                        isActiveLink(link.path)
                          ? "text-pink-400 bg-pink-400/10 border border-pink-400/20"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                      {isActiveLink(link.path) && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side buttons & icons */}
            <div className="flex items-center space-x-4">
              {/* Cart and Wishlist Icons */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Wishlist */}
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:text-pink-400 transition-colors"
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
                </button>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:text-pink-400 transition-colors"
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
                  {user && user.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                      {user.length}
                    </span>
                  )}
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {!localStorage.getItem("token") ||
                localStorage.getItem("token") === "" ? (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 border border-gray-400 text-gray-300 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-pink-500/25"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogOut}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/25"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                      isMobileMenuOpen ? "rotate-90" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isMobileMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActiveLink(link.path)
                          ? "text-pink-400 bg-pink-400/10 border border-pink-400/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* Mobile Auth Buttons */}
                <li className="pt-4 border-t border-gray-700/50">
                  {!localStorage.getItem("token") ||
                  localStorage.getItem("token") === "" ? (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-4 py-3 text-center border border-gray-400 text-gray-300 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-4 py-3 text-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-medium"
                      >
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-center bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium"
                    >
                      Logout
                    </button>
                  )}
                </li>

                {/* Mobile Cart & Wishlist */}
                <li className="flex justify-center space-x-6 pt-4">
                  <button className="p-3 hover:bg-white/10 rounded-lg transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-400"
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
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative p-3 hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-400"
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
                    {user && user.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                        {user.length}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
