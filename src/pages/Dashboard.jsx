/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { ListProduct } from "../components/Dashboard/ListProduct";
import { Navbar } from "../components/Templates/Navbar";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <Navbar />
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-40 my-5">
          <h1 className="mb-5">List Product</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
            {products.map((item, index) => (
              <ListProduct key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
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
