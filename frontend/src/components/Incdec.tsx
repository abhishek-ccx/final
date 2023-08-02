/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CartContext } from "@/contexts/CartContext";
// import React, { useState, useContext } from "react";
// import { CartContext } from "@/contexts/CartContext";

const Incdec = (props: any) => {
  // const [counter, setCounter] = useState(1);

  // const {
  //   cartItems,
  //   cartTotalPrice,
  //   setCartTotalPrice,
  //   cartTotalItem,
  //   setCartTotalItem,
  // } = useContext(CartContext) as any;

  const increaseCount = () => {
    // setCounter(counter + 1);
    // props.quantity += 1;
  };

  const decreaseCount = () => {
    // if (counter > 1) {
    //   setCounter(counter - 1);
    // }
    if (props.quantity > 1) {
      // props.quantity -= 1;
    }
  };

  // useState(() => {
  //   console.log(cartTotalItem);
  // }, [cartTotalItem]);

  return (
    <>
      <div className="flex items-center border-black border h-5 ml-16">
        <button
          className="px-1 text-black hover:text-gray-700 rounded-l"
          onClick={decreaseCount}
        >
          -
        </button>
        <span className="px-3 py-1 text-gray-700">{props.quantity}</span>
        <button
          className="px-1 py-1 text-gray-600 hover:text-gray-700 rounded-r"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
      <div className="ml-20 text-sm py-1">
        {"$" + (props.price * props.quantity).toFixed(2)}
      </div>
    </>
  );
};

export default Incdec;
