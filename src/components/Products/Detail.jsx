import { useState } from "react";
import { BASE_URL } from "../../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Detail = ({ product, paymentMethod }) => {
  const [chargeNumber, setChargeNumber] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const navigate = useNavigate();

  const transaction = async (productId, chargeNumber, paymentMethodId) => {
    const response = await fetch(`${BASE_URL}/users/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
      },
      body: JSON.stringify({
        product_id: Number(productId),
        payment_method_id: Number(paymentMethodId),
        charge_number: chargeNumber,
      }),
    });
    const data = await response.json();

    if (data.messages === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Transaction almost done, please confirm payment",
      });

      navigate("/transaction");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="border rounded-xl p-5 bg-white">
        <p>{product?.name}</p>
        <p>{product?.product_type?.name}</p>
        <p>Rp{product?.price}</p>
        <p>{product?.operator?.name}</p>
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          className="border-2 rounded-xl px-2 w-full my-3 py-4"
          placeholder="input your charge number"
          onChange={(event) => {
            setChargeNumber(event.target.value);
          }}
          value={chargeNumber}
        />
        <select
          className="border-2 rounded-xl px-2 w-full mb-3 py-4 cursor-pointer placeholder:text-gray-300"
          value={paymentMethodId}
          onChange={(event) => {
            setPaymentMethodId(event.target.value);
          }}
          placeholder="select payment method"
        >
          <option disabled={true} value="">
            select payment method
          </option>
          {paymentMethod.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          className="p-5 rounded-xl bg-green-300 hover:text-white hover:bg-green-500"
          onClick={() => transaction(product.id, chargeNumber, paymentMethodId)}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
