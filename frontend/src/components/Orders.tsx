import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Order = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Make the API request to fetch order history data
    axios
      .get("http://127.0.0.1:3000/api/v1/orders/")
      .then((response) => {
        setOrderHistory(response.data.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, []);

  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  const toggleExpandOrder = (orderId) => {
    setExpandedOrderIds((prevIds) => {
      if (prevIds.includes(orderId)) {
        return prevIds.filter((id) => id !== orderId);
      } else {
        return [...prevIds, orderId];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orderHistory.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-md shadow-md">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => toggleExpandOrder(order.id)}
          >
            <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
            <span>{expandedOrderIds.includes(order.id) ? "-" : "+"}</span>
          </div>
          {expandedOrderIds.includes(order.id) && (
            <div className="mt-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center border p-2 mb-2 rounded"
                >
                  <div className="w-16 h-16">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={200}
                      width={200}
                      className="w-full h-full rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Order;
