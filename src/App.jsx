import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
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
      element: <Login /> ,
    },
    {
      path: "/register",
      element: <Register /> ,
    },
    {
      path: "/history",
      element: <>history</> ,
    },
    {
      path: "/profile",
      element: <Profile /> ,
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
