/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";
import { Navbar } from "../components/Templates/Navbar";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.messages === "success") {
        setProducts(data.products);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="mx-40 my-5">
        <h1 className="mb-5">List Product</h1>
        <div className="grid xl:grid-cols-4 gap-10 md:grid-cols-2 sm:grid-cols-1">
          {products.map((item, index) => (
            <div key={index} className="bg-red-100 rounded-lg p-5">
              <p>{item.name}</p>
              <p>{item.product_type.name}</p>
              <p>Rp{item.price}</p>
              <p>{item.operator.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// code_product
// :
// "P51010103"
// created_at
// :
// "2022-07-17T17:58:06.272Z"
// id
// :
// 103
// name
// :
// "Token PLN 655.500"
// operator
// :
// created_at
// :
// "2022-07-03T12:48:52.768Z"
// id
// :
// 1
// name
// :
// "Gopay"
// [[Prototype]]
// :
// Object
// operator_id
// :
// 1
// price
// :
// 655500
// product_type
// :
// {id: 51, name: 'Token PKN', created_at: '2022-07-03T12:40:53.936Z'}
// product_type_id
// :
// 51
// qty
// :
// 20
// status
// :
// true
