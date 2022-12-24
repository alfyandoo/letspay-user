import { BASE_URL } from "../../api/api";

export const ListTransaction = ({
  item,
  getHistoryTransaction,
  setUpdateStatusProduct,
}) => {
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
      
      if (data.messages === "success") {
        window.location.reload();
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className={`${item?.status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'} rounded-lg p-5 my-5`}>
      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Code Transaction</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item.code_transaction}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Produk</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item?.product?.name}</p>
        </div>
      </div>
      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Status</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item.status}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Price</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item.price}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Username</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item.user.username}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Payment method</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item.payment_method.name}</p>
        </div>
      </div>

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
