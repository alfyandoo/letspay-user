import { useNavigate } from "react-router-dom";

export const ListProduct = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded-xl p-5 mb-5 cursor-pointer shadow-md hover:shadow-none"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <p>{item.name}</p>
      <p>{item.product_type.name}</p>
      <p>Rp{item.price}</p>
      <p>Stock {item.qty}</p>
      <p>{item.operator.name}</p>
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