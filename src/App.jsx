import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Transaction } from "./pages/Transaction";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/Templates/ProtectedRoute";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";
import { BASE_URL } from "./api/api";
import { AuthContext } from "./contexts/AuthContext";
import { Navbar } from "./components/Templates/Navbar";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/profiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
        },
      });
      const data = await response.json();

      if (data.messages === "success") {
        setAuthUser(data.user);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const authContextValue = useMemo(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser]
  );

  const paths = [
    {
      path: "/",
      element: (
        <ProtectedRoute mode="auth">
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute mode="public">
          <Login authUser={authUser} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product",
      element: (
        <ProtectedRoute mode="auth">
          <Product />
        </ProtectedRoute>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <ProtectedRoute mode="auth">
          <ProductDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/transaction",
      element: (
        <ProtectedRoute mode="auth">
          <Transaction />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute mode="auth">
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ];

  const securePaths = ['/', '/transaction', '/product', '/profile', '/product/:id']

  return (
    <AuthContext.Provider value={authContextValue}>
      <header>{(securePaths.includes(window.location.pathname) && authUser) && <Navbar />}</header>
      <main className="w-full relative bg-[#FFFDF8] px-5 sm:px-10 md:px-20 lg:px-40">
        <Routes>
          {paths.map((item, index) => (
            <Route key={index} {...item} />
          ))}
        </Routes>
      </main>
      {(securePaths.includes(window.location.pathname) && authUser) && (
        <footer>
          <div className=" z-10 w-full bottom-0 bg-secondary py-3">
            <div className="flex justify-center">
              <p className="text-white text-sm">
                © 2022 All Rights Reserved. LETSPAY
              </p>
            </div>
          </div>
        </footer>
      )}
    </AuthContext.Provider>
  );
};

export default App;
