import { useState } from "react";
import { BASE_URL } from "../../api/api";

export const Detail = ({ product, paymentMethod }) => {
  const [chargeNumber, setChargeNumber] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  const transaction = async (productId, chargeNumber, paymentMethodId) => {
    const response = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: Number(productId),
        payment_method_id: Number(paymentMethodId),
        charge_number: chargeNumber,
      }),
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <div className="bg-red-100 rounded-lg p-5">
        <p>{product?.name}</p>
        <p>{product?.product_type?.name}</p>
        <p>Rp{product?.price}</p>
        <p>{product?.operator?.name}</p>
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          className="border-2 rounded-lg px-2 w-full my-3 py-4"
          placeholder="input your charge number"
          onChange={(event) => {
            setChargeNumber(event.target.value);
          }}
          value={chargeNumber}
        />
        <select
          className="border-2 rounded-lg px-2 w-full mb-3 py-4 placeholder:text-gray-300"
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
          className="p-5 rounded-lg bg-green-300"
          onClick={() => transaction(product.id, chargeNumber, paymentMethodId)}
        >
          Buy
        </button>
      </div>
    </>
  );
};
