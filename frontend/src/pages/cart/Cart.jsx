import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem, udpateCartItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { getImageUrl, getPlaceholderImage } from "../../utils/imageUtils";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item: products } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingItems, setDeletingItems] = useState(new Set());

  const totalItemsInCart = products.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const totalAmountOfCart = products.reduce(
    (amount, item) => amount + item.quantity * item.product.productPrice,
    0
  );

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      await dispatch(udpateCartItem(productId, newQuantity));
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    setDeletingItems((prev) => new Set(prev).add(productId));
    try {
      await dispatch(deleteCartItem(productId));
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setDeletingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {totalItemsInCart} {totalItemsInCart === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
            <button
              onClick={handleContinueShopping}
              className="hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {products.map((product) => {
                  const isDeleting = deletingItems.has(product.product._id);

                  return (
                    <div
                      key={product.product._id}
                      className={`p-6 transition-all duration-300 ${
                        isDeleting
                          ? "opacity-50 pointer-events-none"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                          <img
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                            src={
                              getImageUrl(product.product.productImage) ||
                              getPlaceholderImage(150, 150, "No Image")
                            }
                            alt={product.product.productName}
                            onError={(e) => {
                              e.target.src = getPlaceholderImage(
                                150,
                                150,
                                "No Image"
                              );
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {product.product.productName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {product.product.productDescription ||
                                  "Premium kitchen product"}
                              </p>
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-gray-900">
                                  RS.{product.product.productPrice}
                                </span>
                                {product.product.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    RS.{product.product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(product.product._id)}
                              disabled={isDeleting}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                              {isDeleting ? (
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 mt-4">
                            <span className="text-sm font-medium text-gray-700">
                              Quantity:
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.product._id,
                                    product.quantity - 1
                                  )
                                }
                                disabled={isLoading || product.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

                              <span className="w-12 h-8 flex items-center justify-center text-sm font-semibold bg-gray-50 border border-gray-300 rounded">
                                {product.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.product._id,
                                    product.quantity + 1
                                  )
                                }
                                disabled={isLoading}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

                            <div className="flex-1 text-right">
                              <p className="text-sm text-gray-600">Subtotal</p>
                              <p className="text-lg font-semibold text-gray-900">
                                RS.
                                {(
                                  product.quantity *
                                  product.product.productPrice
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Items ({totalItemsInCart})
                  </span>
                  <span className="font-medium">
                    RS.{totalAmountOfCart.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    RS.{(totalAmountOfCart * 0.1).toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      RS.{(totalAmountOfCart * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
