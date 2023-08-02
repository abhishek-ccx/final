/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const CartContext = React.createContext(null);

const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartTotalItem, setCartTotalItem] = useState<any>(0);
  const [cartTotalPrice, setCartTotalPrice] = useState<any>(0);
  const [compareItems, setCompareItems] = useState<any>([]);

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
  };

  const addToCompare = (product: any) => {
    if (compareItems.length < 4) {
      setCompareItems([...compareItems, product]);
    } else {
      // alert("Four Items already in Cart!");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Four Items already in Cart!",
      });
    }
  };

  const removeFromCart = (productId: any) => {
    const updatedCartItems = cartItems.filter(
      (item: any) => item.id !== productId,
    );
    setCartItems(updatedCartItems);
  };

  const removeFromCompare = (productId: any) => {
    const updatedCompareItems = compareItems.filter(
      (item: any) => item.id !== productId,
    );
    setCompareItems(updatedCompareItems);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (accumulator: any, item: any) => accumulator + item.price * item.quantity,
      0,
    );
    setCartTotalPrice(totalPrice);
  };

  useEffect(() => {
    // console.log(cartItems);
    calculateTotalPrice();
    setCartTotalItem(cartItems.length);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={
        {
          cartItems,
          setCartItems,
          addToCart,
          removeFromCart,
          cartTotalItem,
          setCartTotalItem,
          cartTotalPrice,
          setCartTotalPrice,
          addToCompare,
          compareItems,
          setCompareItems,
          removeFromCompare,
        } as any
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
