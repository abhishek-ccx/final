import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Order = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Make the API request to fetch order history data
    axios
      .get("http://127.0.0.1:3000/api/v1/order/")
      .then((response) => {
        setOrderHistory(response.data.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/api/v1/order/`, {
          headers: { authorization: localStorage.getItem("token") },
        });

        // const TotalItems = res.data;
        // TotalItems.map((e, i) => []);

        // cartArray
        // =>[product, cart.quantity, cart._id]
        const TotalItems = res.data.data;
        const updatedOrderHistory = [];
        TotalItems.map((e, i) => {
          const productArray = e.orderArray;
          // console.log(e);
          for (const item of productArray) {
            const id = item._id;
            const name = item.name;
            const photoUrl = item.photoUrl;
            const status = e.status;
            const price = item.price;
            const isoDate = e.date;
            const dateObject = new Date(isoDate);
            const formattedDate = `${dateObject.toDateString()} ${dateObject.toLocaleTimeString()}`;
            const date = formattedDate;
            updatedOrderHistory.push({
              id,
              name,
              photoUrl,
              status,
              price,
              date,
            });

            // console.log({ id, name, photoUrl, status, price });
          }
          setOrderHistory(updatedOrderHistory);
        });

        // setOrderHistory(res.data);
      } catch (err) {
        console.error("Error in fetching data: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="lg:px-16 lg:py-7 px-6 py-2">
        <Navbar></Navbar>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>
          {/* {console.log(orderHistory)} */}
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="flex items-center border p-4 mb-4 rounded-md shadow-md"
            >
              <div className="flex-shrink-0 w-16 h-16">
                <Image
                  src={order.photoUrl}
                  alt={""}
                  width={500}
                  height={500}
                  className="w-full h-full rounded"
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold">{order.name}</p>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className="text-gray-600">Price: ${order.price}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer></Footer>
      </main>
    </>
  );
};

export default Order;
