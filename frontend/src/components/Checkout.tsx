/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "./Navbar";
import SocialMedia from "./SocialMedia";
import Footer from "./Footer";
// import Image from "next/image";
import Arrow from "./Arrow";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
// import { CartContext } from "@/contexts/CartContext";

const Checkout = () => {
  // const {
  //   cartItems,
  //   cartTotalPrice,
  //   // cartTotalItem,
  //   // setCartTotalItem,
  // } = useContext(CartContext) as any;
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to the login page if the user is not authenticated
          router.push("/login");
        } else {
          const res = await axios.get(
            `http://127.0.0.1:3000/api/v1/cart/getallCart/`,
            { headers: { authorization: localStorage.getItem("token") } },
          );

          // setProducts(res.data.data.products);
          // setLoading(false);
          // console.log(res.data.data);
          setCartItems(res.data.data);
        }
      } catch (err) {
        console.error("Error in fetching data: ", err);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const cartTotalPrice = 0;

  return (
    <>
      <main className="lg:px-16 lg:py-7 px-6 py-2">
        <Navbar></Navbar>
        <SocialMedia></SocialMedia>

        <section className="py-12">
          <div className="ml-10 lg:grid lg:grid-cols-2 lg:gap-2">
            <h1 className="text-xl font-semibold mb-2">My cart</h1>
            <hr className="mt-3 w-full mb-3 border-gray-500" />
            <div>
              {/* {cartItems?.data.map((e: any, i: any) => {
                return <>{console.log(e.product)}</>;
              })} */}

              {cartItems.map((e: any, i: any) => {
                const cartProduct = async () => {
                  try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      // Redirect to the login page if the user is not authenticated
                      router.push("/login");
                    } else {
                      const res = await axios.get(
                        `http://127.0.0.1:3000/api/v1/product/${e.product}/`,
                        {
                          headers: {
                            authorization: localStorage.getItem("token"),
                          },
                        },
                      );
                      console.log(res.data);
                    }
                  } catch (err) {
                    console.error("Error in fetching data: ", err);
                  }
                };

                // console.log(cartProduct.data);

                return <>{/* <Arrow e={cartProduct} i={i} /> */}</>;
              })}

              <hr className="mt-3 w-full mb-3 border-gray-500" />

              <div className="flex">
                <div className="w-6">
                  {/* <Image
                    src={"https://i.ibb.co/F4XSNTm/discount-code.png"}
                    alt={"discount-code"}
                    width={100}
                    height={100}
                  /> */}
                </div>
                <div className="text-orange-500 text-sm">
                  Enter a promo code
                </div>
              </div>
              <div className="flex mt-1">
                <div className="w-5">
                  {/* <Image
                    src={"https://i.ibb.co/1nk4Gym/check.png"}
                    alt={"discount-code"}
                    width={100}
                    height={100}
                  /> */}
                </div>
                <div className="text-orange-500 text-sm">Add a note</div>
              </div>
            </div>
            {/* Second Grid */}
            <div className="lg:ml-16">
              <div className="font-semibold">Order Summary</div>
              <hr className="mt-3 w-full mb-3 border-gray-500" />
              <div className="flex">
                <div>Subtotal</div>
                <div className="ml-64">{"$" + cartTotalPrice.toFixed(2)}</div>
              </div>
              <div className="mt-2">
                <u>Estimate Shipping</u>
              </div>
              <hr className="mt-3 w-full mb-3 border-gray-500" />
              <div className="flex">
                <div>Total</div>
                <div className="ml-72">{"$" + cartTotalPrice.toFixed(2)}</div>
              </div>
              <div>
                <button className="bg-orange-600 text-white w-96 mt-8 h-9">
                  Checkout
                </button>
              </div>
              <div className="flex mt-2 ml-28">
                <div className="w-4 mt-1">
                  {/* <Image
                    src={"https://i.ibb.co/XFZTm2L/lock.png"}
                    alt={"discount-code"}
                    width={100}
                    height={100}
                  /> */}
                </div>
                <div className="ml-1">Secure Checkout</div>
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </main>
    </>
  );
};

export default Checkout;