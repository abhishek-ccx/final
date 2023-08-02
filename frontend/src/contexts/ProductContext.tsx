/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import p4 from "./../img/p4.jpg";
import p5 from "./../img/p5.jpg";
import p6 from "./../img/p6.jpg";
import p7 from "./../img/p7.jpg";
import p8 from "./../img/p8.jpg";
import p9 from "./../img/p9.jpg";
import p10 from "./../img/p10.jpg";
import p11 from "./../img/p11.jpg";
import p12 from "./../img/p12.jpg";
import p13 from "./../img/p13.jpg";

const ProductContext = React.createContext(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductProvider = ({ children }: any) => {
  const [productData, setProductData] = useState({});
  const products = [
    {
      id: 1,
      photo: { url: p4 },
      price: 25,
      isSale: true,
      name: "t1",
      quantity: 1,
      brand: "b1",
      ratings: "⭐⭐⭐⭐",
    },
    {
      id: 2,
      photo: { url: p5 },
      price: 26,
      isSale: false,
      name: "t2",
      quantity: 1,
      brand: "b2",
      ratings: "⭐⭐",
    },
    {
      id: 3,
      photo: { url: p6 },
      price: 25,
      isSale: false,
      name: "t3",
      quantity: 1,
      brand: "b3",
      ratings: "⭐⭐⭐",
    },
    {
      id: 4,
      photo: { url: p7 },
      price: 28,
      isSale: false,
      name: "t4",
      quantity: 1,
      brand: "b4",
      ratings: "⭐⭐",
    },
    {
      id: 5,
      photo: { url: p8 },
      price: 25,
      isSale: false,
      name: "t5",
      quantity: 1,
      brand: "b5",
      ratings: "⭐⭐⭐⭐",
    },
    {
      id: 6,
      photo: { url: p9 },
      price: 30,
      isSale: true,
      name: "t6",
      quantity: 1,
      brand: "b6",
      ratings: "⭐⭐⭐",
    },
    {
      id: 7,
      photo: { url: p10 },
      price: 90,
      isSale: false,
      name: "t7",
      quantity: 1,
      brand: "b7",
      ratings: "⭐⭐⭐",
    },
    {
      id: 8,
      photo: { url: p11 },
      price: 40,
      isSale: true,
      name: "t8",
      quantity: 1,
      brand: "b8",
      ratings: "⭐⭐⭐",
    },
    {
      id: 9,
      photo: { url: p12 },
      price: 25,
      isSale: false,
      name: "t9",
      quantity: 1,
      brand: "b9",
      ratings: "⭐⭐⭐⭐",
    },
    {
      id: 10,
      photo: { url: p13 },
      price: 40,
      isSale: false,
      name: "t10",
      quantity: 1,
      brand: "b10",
      ratings: "⭐⭐⭐",
    },
    {
      id: 11,
      photo: { url: p6 },
      price: 25,
      isSale: false,
      name: "t11",
      quantity: 1,
      brand: "b11",
      ratings: "⭐⭐⭐",
    },
    {
      id: 12,
      photo: { url: p7 },
      price: 75,
      isSale: false,
      name: "t12",
      quantity: 1,
      brand: "b12",
      ratings: "⭐⭐⭐",
    },
  ];

  return (
    <ProductContext.Provider
      value={
        {
          products,
          productData,
          setProductData,
        } as any
      }
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
