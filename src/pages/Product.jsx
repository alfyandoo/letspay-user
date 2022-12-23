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
    getProduct();
    getCategory();
  }, []);

  function handleCategoryChange(event) {
    console.log(event.target.value);
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
        <div className="my-5">
          <div className="flex justify-between">
            <h1>List Product</h1>
            <select
              name="All"
              id="All"
              defaultValue="Pulsa"
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
          <div className="grid grid-cols-1">
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
