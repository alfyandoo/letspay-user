import React, { useState, useEffect } from "react";
import { Loading } from "../components/Templates/Loading";
import { ListProduct } from "../components/Products/ListProduct";
import { BASE_URL } from "../api/api";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const productsFilter = products.filter((item) => item.status === "active");
  console.log(productsFilter);

  useEffect(() => {
    getProduct();
    getCategory()
  }, []);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/product_types`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
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
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setProducts(data.products);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-5">
          <div className="flex justify-between">
          <h1>List Product</h1>
          <select name="All" id="All" defaultValue="All">
            {category.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          </div>
          <div className="grid grid-cols-1">
            {products.map((item, index) => (
              <ListProduct key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
