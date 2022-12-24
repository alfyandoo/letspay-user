import React, { useState, useEffect } from "react";
import { Loading } from "../components/Templates/Loading";
import { ListProduct } from "../components/Products/ListProduct";
import { BASE_URL } from "../api/api";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  let productsFilter = [];

  useEffect(() => {
    const search = window.location.search;
    let type = "";

    if (!!search) {
      type = decodeURI(search.replace("?&type=", ""));
    }

    if (type === "Pulsa") {
      setSelectedCategory("Pulsa");
    }

    if (type === "Token") {
      setSelectedCategory("Token");
    }

    if (type === "E-Wallet") {
      setSelectedCategory("E-Wallet");
    }
    getProduct();
    getCategory();

    window.scrollTo(0, 0);
  }, []);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/product_types`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.messages === "success") {
        setCategory(data.product_types);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
        },
      });
      const data = await response.json();
      if (data.messages === "success") {
        setProducts(data.products);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  productsFilter =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.product_type.name === selectedCategory);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-5 bg-purple-20 w-full h-screen">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl mb-5 text-primary">
              Our Product
            </h1>
            <select
              name="All"
              id="All"
              className="bg-[#FFFDF8] focus:outline-none focus:shadow-outline"
              defaultValue={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
              {category.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 relative">
            {!productsFilter || productsFilter.length === 0 ? (
              <p>Product not found</p>
            ) : (
              productsFilter.map((item, index) => (
                <ListProduct key={index} item={item} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};
