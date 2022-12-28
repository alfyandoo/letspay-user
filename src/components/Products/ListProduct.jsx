import { useNavigate } from "react-router-dom";

export const ListProduct = ({ item }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="border rounded-xl p-5 mb-5 cursor-pointer shadow-md hover:shadow-none w-full"
        onClick={() => navigate(`/product/${item.id}`)}
      >
        <div className="flex">
          <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
            <p>Product</p>
            <p className="mr-2 font-bold">:</p>
          </div>
          <div className="w-[60%] sm:w-[60%] md:w-[75%]">
            <p className="font-bold">{item?.name}</p>
          </div>
        </div>

        <div className="flex">
          <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
            <p>Price</p>
            <p className="mr-2 font-bold">:</p>
          </div>
          <div className="w-[60%] sm:w-[60%] md:w-[75%]">
            <p className="font-bold">Rp{item?.price}</p>
          </div>
        </div>

        <div className="flex">
          <div className="w-[40%] sm:w-[40%] md:w-[25%] flex justify-between">
            <p>Stock</p>
            <p className="mr-2 font-bold">:</p>
          </div>
          <div className="w-[60%] sm:w-[60%] md:w-[75%]">
            <p className="font-bold">{item?.qty}</p>
          </div>
        </div>
      </div>
    </>
  );
};
