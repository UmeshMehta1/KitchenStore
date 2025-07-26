import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../../store/cartSlice";
import { getImageUrl, getPlaceholderImage } from "../../../../utils/imageUtils";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingCart, setLoadingCart] = useState({});
  const [wishlist, setWishlist] = useState(new Set());

  const { data: products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button

    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }

    setLoadingCart((prev) => ({ ...prev, [productId]: true }));
    try {
      await dispatch(addToCart(productId));
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Kitchen Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of high-quality kitchen
            products designed to elevate your culinary experience.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/productdetails/${product._id}`)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  src={
                    getImageUrl(product.productImage) ||
                    getPlaceholderImage(300, 200, "Kitchen Item")
                  }
                  alt={product.productName}
                  onError={(e) => {
                    e.target.src = getPlaceholderImage(
                      300,
                      200,
                      "Kitchen Item"
                    );
                  }}
                />

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex space-x-3">
                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productdetails/${product._id}`);
                      }}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(e, product._id)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    wishlist.has(product._id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                  } backdrop-blur-sm shadow-lg`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={wishlist.has(product._id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  15% OFF
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.productDescription ||
                      "Premium quality kitchen product for your culinary needs."}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">(4.5)</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      RS.{product.productPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      RS.{Math.round(product.productPrice * 1.15)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    disabled={loadingCart[product._id]}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingCart[product._id] ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
