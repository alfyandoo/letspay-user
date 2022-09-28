import React from "react";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  const paths = [
    {
      path: "/",
      element: <>Home</>,
    },
    {
      path: "/login",
      element: <>Login</>,
    },
    {
      path: "/produk",
      element: <>Produk</>,
    },
    {
      path: "/iklan-promo",
      element: <>Iklan Promo</>,
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
