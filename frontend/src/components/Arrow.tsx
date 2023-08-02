/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/contexts/CartContext";
// import Incdec from "./Incdec";

const Arrow = (props: any) => {
  const {
    // cartItems,
    setCartItems,
    removeFromCart,
    // cartTotalPrice,
    // cartTotalItem,
    // setCartTotalItem,
  } = useContext(CartContext) as any;

  const removeHandler = (id: any) => {
    removeFromCart(id);
  };

  const increaseCount = () => {
    // console.log("clalles");
    setCartItems((prevProducts: any) => {
      const updatedProducts = prevProducts.map((product: any) => {
        if (product.id === props.e.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      return updatedProducts;
    });
    // setCounter(counter + 1);
    // props.quantity += 1;
  };

  const decreaseCount = () => {
    setCartItems((prevProducts: any) => {
      const updatedProducts = prevProducts
        .map((product: any) => {
          if (product.id === props.e.id) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        })
        .filter((items: any) => items.quantity !== 0);
      return updatedProducts;
    });
    // if (counter > 1) {
    //   setCounter(counter - 1);
    // }
    if (props.quantity > 1) {
      // props.quantity -= 1;
    }
  };

  return (
    <>
      <hr className="mt-3 w-full mb-3 border-gray-500" />
      <div className="flex py-4 mb-5">
        <div className="w-20" key={props.i}>
          <Image src={props.e.photo.url} alt="p14" />
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
          <span className="px-3 py-1 text-gray-700">{props.e.quantity}</span>
          <button
            className="px-1 py-1 text-gray-600 hover:text-gray-700 rounded-r"
            onClick={increaseCount}
          >
            +
          </button>
        </div>
        <div className="ml-20 text-sm py-1">
          {"$" + (props.e.price * props.e.quantity).toFixed(2)}
        </div>
        <div className="text-xs ml-20 py-2 font-semibold">
          <button onClick={() => removeHandler(props.e.id)}>X</button>
        </div>
      </div>
    </>
  );
};

export default Arrow;
