/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api/api";
import { Navbar } from "../components/Templates/Navbar";
import { Detail } from "../components/Products/Detail";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
    getPaymentMethod();
  }, []);

  const getProductById = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setProduct(data.product);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  const getPaymentMethod = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/payment_methods`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setPaymentMethod(data.payment_methods);
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
          <h1 className="mb-5">Detail Product</h1>
          <Detail product={product} paymentMethod={paymentMethod} />
        </div>
      )}
    </>
  );
};
