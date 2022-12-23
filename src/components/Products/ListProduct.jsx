import { useNavigate } from "react-router-dom";

export const ListProduct = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded-xl p-5 mb-5 cursor-pointer shadow-md hover:shadow-none"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Product</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">{item?.name}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Price</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">Rp{item?.price}</p>
        </div>
      </div>

      <div class="flex">
        <div class="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
          <p>Stock</p>
          <p class="mr-2 font-bold">:</p>
        </div>
        <div class="w-[60%] sm:w-[60%] md:w-[75%]">
          <p class="font-bold">Rp{item?.qty}</p>
        </div>
      </div>
    </div>
  );
};

// response list product
// [
//   {
//     id: 103,
//     code_product: "P51010103",
//     name: "Token PLN 655.500",
//     status: true,
//     price: 655500,
//     qty: 20,
//     created_at: "2022-07-17T17:58:06.272Z",
//     product_type_id: 51,
//     product_type: {
//       id: 51,
//       name: "Token PKN",
//       created_at: "2022-07-03T12:40:53.936Z",
//     },
//     operator_id: 1,
//     operator: {
//       id: 1,
//       name: "Gopay",
//       created_at: "2022-07-03T12:48:52.768Z",
//     },
//   },
// ];
