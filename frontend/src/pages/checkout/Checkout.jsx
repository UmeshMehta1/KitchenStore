import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createOrder } from "../../store/checkoutSlice";
import { STATUSES } from "../../global/mic/statuses";
import { useNavigate } from "react-router-dom";
import { APIAuthenticated } from "../../https/index";
import { getImageUrl, getPlaceholderImage } from "../../utils/imageUtils";

const CheckOut = () => {
  const navigate = useNavigate();
  const { item: products } = useSelector((state) => state.cart);
  const { status, data } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  console.log(status, data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!products || products.length === 0) {
      navigate("/cart");
    }
  }, [products, navigate]);

  const subTotal =
    products && products.length > 0
      ? products.reduce(
          (amount, item) => item.quantity * item.product.productPrice + amount,
          0
        )
      : 0;
  const shippingAmount = subTotal > 2000 ? 0 : 100; // Free shipping over 2000
  const taxAmount = Math.round(subTotal * 0.13); // 13% tax
  const totalAmount = subTotal + shippingAmount + taxAmount;

  const handleOrder = async (formData) => {
    setIsProcessing(true);
    try {
      const orderDetails = {
        shippingAddress: formData.shippingAddress,
        totalAmount,
        items: products,
        paymentDetails: {
          method: paymentMethod,
        },
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        customerName: formData.customerName,
      };

      await dispatch(createOrder(orderDetails));
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessing(false);
    }
  };

  const handleKhalti = async (orderId, totalAmount) => {
    try {
      const response = await APIAuthenticated.post("/payment", {
        orderId,
        amount: totalAmount,
      });
      if (response.status === 200) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error("Khalti payment error:", error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (status === STATUSES.SUCCESS && data?.length) {
      const currentOrder = data[data.length - 1];

      if (paymentMethod === "COD") {
        setOrderPlaced(true);
        setIsProcessing(false);
        // Clear cart and redirect after delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (paymentMethod === "khalti") {
        const { totalAmount, _id: orderId } = currentOrder;
        handleKhalti(orderId, totalAmount);
      }
    }
  }, [status, data, paymentMethod, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Order success component
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(handleOrder)}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
              noValidate
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("customerName", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="9800000000"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Shipping Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    {...register("shippingAddress", {
                      required: "Shipping address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters",
                      },
                    })}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none ${
                      errors.shippingAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="123 Street Name, City, State, Postal Code"
                  />
                  {errors.shippingAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={handlePaymentChange}
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <div className="ml-3">
                      <span className="font-semibold text-gray-900">
                        Cash on Delivery (COD)
                      </span>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "khalti"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value="khalti"
                      checked={paymentMethod === "khalti"}
                      onChange={handlePaymentChange}
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <div className="ml-3">
                      <span className="font-semibold text-gray-900">
                        Khalti (Online Payment)
                      </span>
                      <p className="text-sm text-gray-600">
                        Pay securely with Khalti
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full mt-8 py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  paymentMethod === "COD"
                    ? "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900"
                    : "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                } shadow-lg hover:shadow-xl`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : paymentMethod === "COD" ? (
                  "Place Order"
                ) : (
                  `Pay RS.${totalAmount} with Khalti`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Products List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.product._id}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src={
                        getImageUrl(product.product.productImage) ||
                        getPlaceholderImage(60, 60, "")
                      }
                      alt={product.product.productName}
                      className="w-12 h-12 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src = getPlaceholderImage(60, 60, "");
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {product.product.productName}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      RS.
                      {(
                        product.product.productPrice * product.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">RS.{subTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingAmount === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `RS.${shippingAmount}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (13%)</span>
                  <span className="font-medium">RS.{taxAmount.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      RS.{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

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
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
