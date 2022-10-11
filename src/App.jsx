import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";

export const App = () => {
  const paths = [
    {
      path: "/",
      element: <Dashboard />,
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
      element: <>product</>,
    },
    {
      path: "/product/:id",
      element: <>product detail</>,
    },
    {
      path: "/history",
      element: <History />,
    },
    {
      path: "/profile",
      element: <Profile />,
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
