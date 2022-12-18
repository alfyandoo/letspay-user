import { BASE_URL } from "../../api/api";

export const ListTransaction = ({ item, getHistoryTransaction, setUpdateStatusProduct }) => {
  const confirmPayment = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/payments/${item.code_transaction}/${item.price}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
          },
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data), "poi");
      if (data.messages === "success") {
        setUpdateStatusProduct(true);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-green-100 rounded-lg p-5 my-5">
      <p>{item.code_transaction}</p>
      <p>Produk: {item.product.name}</p>
      <p>{item.status}</p>
      <p>{item.price}</p>
      <p>{item.user.username}</p>
      <p>Payment method: {item.payment_method.name}</p>

      {item.status === "pending" && (
        <button
          onClick={async () => await confirmPayment()}
          className="p-5 w-full mt-3 rounded-lg bg-blue-200 hover:bg-blue-400 hover:text-white"
        >
          Confirm Payment
        </button>
      )}
    </div>
  );
};
