/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

// import { CartContext } from "@/contexts/CartContext";
// import Incdec from "./Incdec";

// useEffect(() => {}, []);

const Arrow = (props: any) => {
  // console.log(props.e);
  const [isRemoved, setIsRemoved] = useState(false);
  const [quantity, setQuantity] = useState(props.quantity);

  const removeHandler = async (productID: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/removecart/${productID}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        },
      );
      if (response.status === 200) {
        setIsRemoved(true);
        // console.log(response.data);
        // fetchCartItem();
        console.log("successfully removed item from cart");
      }
    } catch (error) {
      console.error("Error while removing item from cart.", error);
    }
  };

  const increaseCount = async () => {
    try {
      // console.log(props.id);
      const response = await axios.put(
        `http://localhost:3000/api/v1/cart/updatecart/${props.id}`,
        {
          quantity: quantity + 1,
        },
        {
          headers: { authorization: localStorage.getItem("token") },
        },
      );
      if (response.status === 200) {
        setQuantity(quantity + 1);
        console.log("Successfully increased quantity");
      }
    } catch (error) {
      console.error("Error while increasing quantity.", error);
    }
  };

  const decreaseCount = async () => {
    if (quantity > 1) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/cart/updatecart/${props.id}`,
          {
            quantity: quantity - 1,
          },
          {
            headers: { authorization: localStorage.getItem("token") },
          },
        );
        if (response.status === 200) {
          setQuantity(quantity - 1);
          console.log("Successfully decreased quantity");
        }
      } catch (error) {
        console.error("Error while decreasing quantity.", error);
      }
    }
  };

  if (isRemoved) {
    return null; // Hide the item from the cart once it is removed
  }

  return (
    <>
      <hr className="mt-3 w-full mb-3 border-gray-500" />
      <div className="flex py-4 mb-5">
        <div className="w-20" key={props.i}>
          <Image src={props.e.photoUrl} height={500} width={500} alt="p14" />
        </div>
        <div className="ml-2">
          <div className="size-sm">{props.e.name}</div>
          <div> {"$" + props.e.price.toFixed(2)}</div>
          <div className="text-sm text-slate-500">Size : Medium</div>
          <div className="text-sm text-slate-500">Colour : Blue</div>
        </div>

        {/* <Incdec price_value={props.e.price} price_quantity={props.e.quantity} /> */}
        <div className="flex items-center border-black border h-5 ml-16">
          <button
            className="px-1 text-black hover:text-gray-700 rounded-l"
            onClick={decreaseCount}
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-700">{quantity}</span>
          <button
            className="px-1 py-1 text-gray-600 hover:text-gray-700 rounded-r"
            onClick={increaseCount}
          >
            +
          </button>
        </div>
        <div className="ml-20 text-sm py-1">
          {"$" + (props.e.price * quantity).toFixed(2)}
        </div>
        <div className="text-xs ml-20 py-2 font-semibold">
          <button onClick={() => removeHandler(props.e._id)}>X</button>
        </div>
      </div>
    </>
  );
};

export default Arrow;
