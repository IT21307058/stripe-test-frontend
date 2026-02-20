import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import stripeConfig from "../config/stripe";

const PRODUCTS = {
  "chatgpt-class": {
    name: "How to Use Chat GPT Class",
    price: "$0.10",
    description: "Learn how to use ChatGPT effectively",
  },
  book: {
    name: "Preethi's Book Download",
    price: "$0.10",
    description: "Download Preethi's exclusive book",
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productType = searchParams.get("productType") || "chatgpt-class";

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    secondPhone: "",
    mailingAddress: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // If Stripe returns the user to the checkout page after cancelling,
  // we show a helpful banner. The backend sets `?canceled=true` on cancel_url.
  const canceled = searchParams.get("canceled") === "true";

  const product = PRODUCTS[productType];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.mailingAddress.trim()) {
      newErrors.mailingAddress = "Mailing address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Validate Stripe configuration
      if (!stripeConfig.publishableKey) {
        alert("Payment system is not properly configured. Please contact support.");
        setLoading(false);
        return;
      }

      // Load Stripe
      const stripePromise = loadStripe(stripeConfig.publishableKey);
      
      if (!stripePromise) {
        alert("Payment system is not properly configured. Please contact support.");
        setLoading(false);
        return;
      }

      // Create checkout session
      const apiUrl = stripeConfig.apiUrl || "http://localhost:8001";
      const response = await axios.post(
        `${apiUrl}/api/orders/create-checkout-session`,
        {
          ...formData,
          productType,
        }
      );

      const { sessionId } = response.data;

      if (!sessionId) {
        throw new Error("No session ID returned from server");
      }

      // Initialize Stripe and redirect to checkout
      const stripe = await stripePromise;
      console.log("Redirecting to Stripe with sessionId:", sessionId);

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      // Handle any errors that occur during redirect
      if (result.error) {
        console.error("Stripe redirect error:", result.error);
        alert(result.error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {canceled && (
          <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              You returned from Stripe without completing payment. Your order
              was not completed — please try again or contact support if the
              problem persists.
            </p>
          </div>
        )}
        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600">{product.price}</p>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Checkout Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.customerName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Second Phone (Optional) */}
            <div>
              <label
                htmlFor="secondPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Second Phone (Optional)
              </label>
              <input
                type="tel"
                id="secondPhone"
                name="secondPhone"
                value={formData.secondPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>

            {/* Mailing Address */}
            <div>
              <label
                htmlFor="mailingAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mailing Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mailingAddress"
                name="mailingAddress"
                value={formData.mailingAddress}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border ${
                  errors.mailingAddress ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your complete mailing address"
              />
              {errors.mailingAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.mailingAddress}
                </p>
              )}
            </div>

            {/* Contact Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-gray-700">
              <p>
                We appreciate your business. Thank you for buying from us. If
                you feel there has been an error, or have questions, please
                contact{" "}
                <a
                  href="mailto:pre@preethifernando.com"
                  className="text-blue-600 hover:underline"
                >
                  pre@preethifernando.com
                </a>
              </p>
              <p className="mt-2">
                Please put in subject line, <strong>Product/Service Purchase Question</strong>.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
