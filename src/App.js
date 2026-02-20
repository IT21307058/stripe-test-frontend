import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./features/user/AuthGuard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductLanding from "./pages/ProductLanding";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      {/* <div style={{ minHeight: "90vh", margin: "0px", padding: "0px" }}> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        
        {/* Stripe Payment Routes */}
        <Route path="/" element={<ProductLanding />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        
        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            // <AuthGuard>
              <Dashboard />
            // </AuthGuard>
          }
        />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
