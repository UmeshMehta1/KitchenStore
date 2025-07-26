import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../store/cartSlice";
import { getImageUrl, getPlaceholderImage } from "../../../utils/imageUtils";
const Product = ({ id: productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const {
    data: user,
    selectedProduct,
    loading,
  } = useSelector((state) => state.product);
  const product = selectedProduct?.product?.[0];

  const handleCart = async () => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "" ||
      localStorage.getItem("token") === null
    ) {
      return navigate("/login");
    }

    setIsAddingToCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        await dispatch(addToCart(productId));
      }
      // Show success message or notification here
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "" ||
      localStorage.getItem("token") === null
    ) {
      return navigate("/login");
    }
    // Add to cart first, then navigate to checkout
    handleCart().then(() => {
      navigate("/checkout");
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically dispatch an action to add/remove from wishlist
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-b-2 border-pink-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Process product images with proper URL handling
  const productImages = [
    getImageUrl(product.productImage),
    getImageUrl(product.productImage), // In real scenario, these would be different images
    getImageUrl(product.productImage),
    getImageUrl(product.productImage),
  ].filter(Boolean); // Remove any null/undefined values

  const originalPrice = product.productPrice * 1.2; // Mock original price
  const discount = Math.round((1 - product.productPrice / originalPrice) * 100);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                Home
              </button>
            </li>
            <li>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <button
                onClick={() => navigate("/products")}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                Products
              </button>
            </li>
            <li>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="font-medium text-gray-900">
                {product.productName}
              </span>
            </li>
          </ol>
        </nav>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="p-6 lg:p-8">
              {/* Main Image */}
              <div className="relative mb-4 group">

                <img
                  src={
                    productImages[selectedImageIndex] ||
                    getPlaceholderImage(600, 400, "Product Image")
                  }
                  alt={product.productName}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = getPlaceholderImage(
                      600,
                      400,
                      "Product Image"
                    );
                  }}
                />

                {/* Wishlist Button */}
                <button
                  onClick={toggleWishlist}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                    isWishlisted
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
                  } backdrop-blur-sm`}
                >
                  <svg
                    className="w-6 h-6"
                    fill={isWishlisted ? "currentColor" : "none"}
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
                {discount > 0 && (
                  <div className="absolute px-3 py-1 text-sm font-semibold text-white rounded-full top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex pb-2 space-x-3 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-pink-500 ring-offset-2"
                        : "hover:opacity-75"
                    }`}
                  >
                    <img
                      src={image || getPlaceholderImage(80, 80, "")}
                      alt={`${product.productName} ${index + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = getPlaceholderImage(80, 80, "");
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 lg:p-8">
              <div className="space-y-6">
                {/* Product Title and Rating */}
                <div>
                  <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                    {product.productName}
                  </h1>

                  <div className="flex items-center mb-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600">4.5 (1,234 reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl font-bold text-gray-900">
                      RS.{product.productPrice}
                    </span>
                    {discount > 0 && (
                      <span className="text-xl text-gray-500 line-through">
                        RS.{originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-green-600">
                      ✓ Free Delivery
                    </span>
                    <span className="font-semibold text-blue-600">
                      ✓ 30-Day Returns
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {product.productDescription ||
                      "Experience premium quality with this exceptional kitchen product. Designed for durability and performance, it's perfect for both professional and home use."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span className="flex items-center justify-center w-16 h-10 text-lg font-semibold border border-gray-300 rounded-lg bg-gray-50">
                      {quantity}
                    </span>

                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 10}
                      className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    className="w-full px-6 py-4 font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : "Buy Now"}
                  </button>

                  <button
                    onClick={handleCart}
                    disabled={isAddingToCart}
                    className="w-full px-6 py-4 font-bold text-gray-800 transition-all duration-300 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingToCart ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-600 rounded-full border-t-transparent animate-spin"></div>
                        <span>Adding to Cart...</span>
                      </div>
                    ) : (
                      `Add ${quantity} to Cart`
                    )}
                  </button>
                </div>

                {/* Features */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Product Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Premium Quality Materials
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">Dishwasher Safe</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">1 Year Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}

        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder for related products */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex items-center justify-center h-48 bg-gray-200">
                  <span className="text-gray-500">Related Product {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Related Product {item}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Great kitchen accessory
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">
                      RS.{(Math.random() * 1000 + 500).toFixed(0)}
                    </span>
                    <button className="text-pink-500 transition-colors hover:text-pink-600">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
