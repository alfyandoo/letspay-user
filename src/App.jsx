import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Transaction } from "./pages/Transaction";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/Templates/ProtectedRoute";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";
import { BASE_URL } from "./api/api";
import { AuthContext } from "./contexts/AuthContext";
import { Navbar } from "./components/Templates/Navbar";

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
      console.log(JSON.stringify(data));
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
  console.log(authUser, 'authuser');
  return (
    <AuthContext.Provider value={authContextValue}>
      <header>
        {authUser && <Navbar />}
      </header>
      <main className="w-full relative bg-[#FFFDF8] px-5 sm:px-10 md:px-20 lg:px-40">
        <Routes>
          {paths.map((item, index) => (
            <Route key={index} {...item} />
          ))}
        </Routes>
      </main>
    </AuthContext.Provider>
  );
};

export default App;
