import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Transaction } from "./pages/Transaction";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/Templates/ProtectedRoute";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";

export const App = () => {
  const paths = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/product",
      element: (
        <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/transaction",
      element: (
        <ProtectedRoute>
          <Transaction />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/*",
      element: <>not found</>,
    },
  ];

  return (
    <>
      <Routes>
        {paths.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </Routes>
    </>
  );
};

export default App;
