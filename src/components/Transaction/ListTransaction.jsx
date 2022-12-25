import { BASE_URL } from "../../api/api";
import Swal from "sweetalert2";

export const ListTransaction = ({
  item,
  getHistoryTransaction,
  setUpdateStatusProduct,
}) => {
  const confirmPayment = async () => {
    try {
      await fetch(
        `${BASE_URL}/payments/${item.code_transaction}/${item.price}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
          },
        }
      );
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

      if (data.messages === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment Success",
        });
        const timer = setTimeout(() => {
          getHistoryTransaction();
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div
      className={`${
        item?.status === "pending" ? "border-yellow-200" : "border-green-200"
      } rounded-xl p-5 my-5 border mb-5 cursor-pointer shadow-md hover:shadow-none w-full`}
    >
      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Code Transaction</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item.code_transaction}</p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Produk</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item?.product?.name}</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Status</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item.status}</p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Price</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item.price}</p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Username</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item.user.username}</p>
        </div>
      </div>

      <div className="flex">
        <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Payment method</p>
          <p className="mr-2 font-bold">:</p>
        </div>
        <div className="w-[60%] sm:w-[60%] md:w-[75%]">
          <p className="font-bold">{item.payment_method.name}</p>
        </div>
      </div>

      {item.status === "pending" && (
        <button
          onClick={async () => {
            const timer = setTimeout(async() => {
              await confirmPayment();
            }, 10000);
            getHistoryTransaction();
            return () => clearTimeout(timer);
          }}
          className="p-5 w-full mt-3 rounded-lg bg-blue-200 hover:bg-blue-400 hover:text-white"
        >
          Confirm Payment
        </button>
      )}
    </div>
  );
};
