import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import stripeConfig from "../config/stripe";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    } else {
      setError("No session ID found");
      setLoading(false);
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const apiUrl = stripeConfig.apiUrl || "http://localhost:8001";
      const response = await axios.get(
        `${apiUrl}/api/orders/session/${sessionId}`
      );
      setOrder(response.data.order);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to fetch order details");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Order Not Found
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon and Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your purchase
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
            Order Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">
                {order.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product:</span>
              <span className="font-medium text-gray-900">
                {order.productName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium text-green-600">
                ${order.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
            Customer Information
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 block text-sm">Name:</span>
              <span className="font-medium text-gray-900">
                {order.customerName}
              </span>
            </div>
            <div>
              <span className="text-gray-600 block text-sm">Email:</span>
              <span className="font-medium text-gray-900">{order.email}</span>
            </div>
            <div>
              <span className="text-gray-600 block text-sm">Phone:</span>
              <span className="font-medium text-gray-900">{order.phone}</span>
            </div>
            {order.secondPhone && (
              <div>
                <span className="text-gray-600 block text-sm">
                  Second Phone:
                </span>
                <span className="font-medium text-gray-900">
                  {order.secondPhone}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-600 block text-sm">
                Mailing Address:
              </span>
              <span className="font-medium text-gray-900">
                {order.mailingAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Thank You / Class Message */}
        {order.productType === 'ai-mastery' ? (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-8 mb-6 border-l-4 border-blue-600">
            <div className="text-center">
              <p className="text-lg text-gray-800 leading-relaxed">
                Hi, I am Preethi Fernando. So glad you registered for my class. You will receive the Zoom link soon.
              </p>
              <p className="mt-6 text-xl font-semibold text-blue-900">
                – Preethi Fernando
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-8 mb-6 border-l-4 border-blue-600">
            <div className="text-center">
              <p className="text-lg text-gray-800 leading-relaxed">
                "I appreciate your business. Thank you for your purchase.
              </p>
              <p className="mt-4 text-lg text-gray-800 leading-relaxed">
                Was there something I could have done differently, to improve your
                customer satisfaction?
              </p>
              <p className="mt-4 text-lg text-gray-800 leading-relaxed">
                I look forward to serving you again."
              </p>
              <p className="mt-6 text-xl font-semibold text-blue-900">
                – Preethi Fernando
              </p>
            </div>
          </div>
        )}

        {/* Email Receipt Notice */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-blue-500 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-900">Email Receipt Sent</h3>
              <p className="mt-1 text-sm text-gray-600">
                A receipt for your purchase of <strong>{order.productName}</strong> has
                been sent to <strong>{order.email}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-700">
            If you feel there has been an error, or have questions, please
            contact{" "}
            <a
              href="mailto:pre@preethifernando.com?subject=Product%2FService%20Purchase%20Question"
              className="text-blue-600 hover:underline font-medium"
            >
              pre@preethifernando.com
            </a>
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Please put in subject line:{" "}
            <strong>Product/Service Purchase Question</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
