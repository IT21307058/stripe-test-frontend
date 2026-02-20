import React from "react";
import { useNavigate } from "react-router-dom";

const ProductLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Preethi Fernando's Newsletter
          </h1>
          <p className="text-lg text-gray-600">
            Exclusive Offers - Limited Time!
          </p>
        </div>

        {/* Newsletter Content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-6 text-center">
            <h2 className="text-3xl font-bold mb-2">Special Offer Inside</h2>
            <p className="text-xl">Get Started Today for Just $0.10!</p>
          </div>

          {/* Products Section */}
          <div className="p-8">
            {/* Product 1: ChatGPT Class */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    How to Use ChatGPT Class
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master the power of AI and ChatGPT with our comprehensive
                    course. Learn tips, tricks, and strategies to get the most
                    out of AI technology.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-3xl font-bold text-blue-600">
                      $1
                    </span>
                    <button
                      onClick={() =>
                        navigate("/checkout?productType=chatgpt-class")
                      }
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-200 transform hover:scale-105"
                    >
                      Sign Up Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2: Book Download */}
            <div className="mb-4">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Download Preethi's Book
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get instant access to Preethi Fernando's exclusive book.
                    Packed with insights, strategies, and real-world knowledge
                    you can apply immediately.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-3xl font-bold text-green-600">
                      $1
                    </span>
                    <button
                      onClick={() => navigate("/checkout?productType=book")}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition duration-200 transform hover:scale-105"
                    >
                      Download Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-6 text-center border-t">
            <p className="text-sm text-gray-600 mb-2">
              Have questions? Contact us at{" "}
              <a
                href="mailto:pre@preethifernando.com"
                className="text-blue-600 hover:underline font-medium"
              >
                pre@preethifernando.com
              </a>
            </p>
            <p className="text-xs text-gray-500">
              For product purchase questions, please include "Product/Service
              Purchase Question" in the subject line.
            </p>
          </div>
        </div>

        {/* Information Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-blue-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                How This Works
              </h3>
              <p className="text-sm text-blue-800">
                Click on either product button to proceed to a secure checkout
                page. You'll enter your information and complete payment via
                Stripe. After purchase, you'll receive an email receipt with
                your order details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLanding;
