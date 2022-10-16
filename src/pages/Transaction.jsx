/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { Navbar } from "../components/Templates/Navbar";
import { ListTransaction } from "../components/Transaction/ListTransaction";

export const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistoryTransaction();
  }, []);

  const getHistoryTransaction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/transactions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setTransaction(data.transactions);
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
          <h1>List Transaction</h1>
          <div className="grid grid-cols-1">
            {transaction.map((item, index) => (
              <ListTransaction key={index} item={item} getHistoryTransaction={getHistoryTransaction}  />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// response api history
// {
//   "messages": "success",
//   "transactions": [
//     {
//       "id": 24,
//       "code_transaction": "TR-56890024",
//       "status": "success",
//       "charge_number": "32107461785",
//       "token": "62d54ae899a13e38fb669032",
//       "price": 5100,
//       "created_at": "2022-07-18T11:56:45.13Z",
//       "user_id": 56,
//       "user": {
//         "id": 56,
//         "email": "19081010065@student.upnjatim.ac.id",
//         "username": "arifws",
//         "password": "$2a$10$BlvPohwSpcOzr4SzXagsXe0NEFWXp.gMerwWVseVuzf9rVyh3ymV2",
//         "name": "arif widiasan",
//         "phone": "081945791621",
//         "balance": 0,
//         "created_at": "2022-07-18T11:56:13.282Z"
//       },
//       "product_id": 0,
//       "product": {
//         "id": 0,
//         "code_product": "",
//         "name": "",
//         "status": null,
//         "price": 0,
//         "qty": 0,
//         "created_at": "0001-01-01T00:00:00Z",
//         "product_type_id": 0,
//         "product_type": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         },
//         "operator_id": 0,
//         "operator": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         }
//       },
//       "payment_method_id": 3,
//       "payment_method": {
//         "id": 3,
//         "code_bank": "MANDIRI",
//         "name": "Bank Mandiri",
//         "status": true,
//         "code_va": "88608",
//         "range": 9999100000,
//         "created_at": "2022-07-10T14:24:05.882Z"
//       }
//     },
//     {
//       "id": 25,
//       "code_transaction": "TR-56790025",
//       "status": "success",
//       "charge_number": "0857239371",
//       "token": "62e0f3674617927e95b43841",
//       "price": 103000,
//       "created_at": "2022-07-27T07:51:24.849Z",
//       "user_id": 56,
//       "user": {
//         "id": 56,
//         "email": "19081010065@student.upnjatim.ac.id",
//         "username": "arifws",
//         "password": "$2a$10$BlvPohwSpcOzr4SzXagsXe0NEFWXp.gMerwWVseVuzf9rVyh3ymV2",
//         "name": "arif widiasan",
//         "phone": "081945791621",
//         "balance": 0,
//         "created_at": "2022-07-18T11:56:13.282Z"
//       },
//       "product_id": 0,
//       "product": {
//         "id": 0,
//         "code_product": "",
//         "name": "",
//         "status": null,
//         "price": 0,
//         "qty": 0,
//         "created_at": "0001-01-01T00:00:00Z",
//         "product_type_id": 0,
//         "product_type": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         },
//         "operator_id": 0,
//         "operator": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         }
//       },
//       "payment_method_id": 3,
//       "payment_method": {
//         "id": 3,
//         "code_bank": "MANDIRI",
//         "name": "Bank Mandiri",
//         "status": true,
//         "code_va": "88608",
//         "range": 9999100000,
//         "created_at": "2022-07-10T14:24:05.882Z"
//       }
//     },
//     {
//       "id": 26,
//       "code_transaction": "TR-561080026",
//       "status": "success",
//       "charge_number": "0857239371",
//       "token": "632c03c8430dc875016ebbd2",
//       "price": 1211212,
//       "created_at": "2022-09-22T06:27:36.636Z",
//       "user_id": 56,
//       "user": {
//         "id": 56,
//         "email": "19081010065@student.upnjatim.ac.id",
//         "username": "arifws",
//         "password": "$2a$10$BlvPohwSpcOzr4SzXagsXe0NEFWXp.gMerwWVseVuzf9rVyh3ymV2",
//         "name": "arif widiasan",
//         "phone": "081945791621",
//         "balance": 0,
//         "created_at": "2022-07-18T11:56:13.282Z"
//       },
//       "product_id": 108,
//       "product": {
//         "id": 108,
//         "code_product": "P80070108",
//         "name": "sdfsdf",
//         "status": true,
//         "price": 1211212,
//         "qty": 13,
//         "created_at": "2022-08-19T08:43:26.57Z",
//         "product_type_id": 80,
//         "product_type": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         },
//         "operator_id": 7,
//         "operator": {
//           "id": 0,
//           "name": "",
//           "created_at": "0001-01-01T00:00:00Z"
//         }
//       },
//       "payment_method_id": 2,
//       "payment_method": {
//         "id": 2,
//         "code_bank": "BNI",
//         "name": "Bank Nasional Indonesia",
//         "status": true,
//         "code_va": "8808",
//         "range": 999910000000,
//         "created_at": "2022-07-10T14:20:26.985Z"
//       }
//     }
//   ]
// }
