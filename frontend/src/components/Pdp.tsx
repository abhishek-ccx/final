/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import p14 from "./../img/p14.jpg";
import p15 from "./../img/p15.jpg";
import p16 from "./../img/p16.jpg";
import Link from "next/link";
import Navbar from "./Navbar";
import SocialMedia from "./SocialMedia";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
// import { ProductContext } from "@/contexts/ProductContext";
// import { CartContext } from "@/contexts/CartContext";
import router from "next/router";
import axios from "axios";

export default function Pdp() {
  const Images = [
    {
      photo: { url: p14 },
    },
    {
      photo: { url: p16 },
    },
    {
      photo: { url: p14 },
    },
    {
      photo: { url: p16 },
    },
  ];

  // const { addToCart, addToCompare } = useContext(CartContext) as any;
  const { productId } = router.query;

  const [productData, setProductData] = useState([]);

  const handleAddToCart = async (productData) => {
    // addToCart(productData);
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (!token) {
        // Redirect to the login page if the user is not authenticated
        alert("You are not logged in!");
        router.push("/login");
      } else {
        const res = await axios.patch(
          `http://127.0.0.1:3000/api/v1/cart/addcart`,
          {
            product: productData._id,
            quantity: productData.quantity,
          },
          { headers: { authorization: localStorage.getItem("token") } },
        );
        console.log(res.status);
        if (res.status == 200) {
          router.push("/cart");
          console.log("product send to cart add API");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (productId) {
          const res = await axios.get(
            `http://127.0.0.1:3000/api/v1/products/${productId}`,
          );
          if (res.data.data.product) {
            setProductData(res.data.data.product);
          } else {
            throw new Error("Product not found");
          }
          console.log(res.data);
        } else {
          throw new Error("Product not found..");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProductData();
  }, [productId]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <>
      <main className="lg:px-16 lg:py-7 px-6 py-2">
        <Navbar></Navbar>
        <SocialMedia></SocialMedia>
        <section>
          <div className="grid grid-cols-2 gap-4 lg:px-36 lg:pt-16 px-4 pt-6">
            <div className="text-xs">
              <div className="lg:h-12 h-8">
                <div className="flex">
                  <div className="flex-none">
                    <a
                      href="#"
                      className="lg:font-medium lg:text-xs text-[0.5rem] font-base"
                    >
                      Home
                    </a>
                    <span className="lg:text-xs text-[0.5rem]">/</span>
                  </div>
                  <div className="flex-initial">
                    <a
                      href="#"
                      className="lg:pl-1.5 pl-1 lg:font-medium lg:text-xs text-[0.5rem] font-base"
                    >
                      Women
                    </a>
                    <span className="lg:text-xs text-[0.5rem]">/</span>
                  </div>
                  <div className="flex-initial">
                    <a
                      href="#"
                      className="lg:pl-1.5 pl-1 lg:text-xs text-[0.5rem]"
                    >
                      I&apos;m a product
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  className="w-full hover:border-orange-500 cursor-pointer"
                  src={productData.photoUrl}
                  alt="p14"
                  width={500}
                  height={500}
                />
              </div>
              <div className="grid lg:grid-cols-7 grid-flow-col gap-0 pt-3">
                <div className="lg:col-span-3 ml-3">
                  <div className="grid lg:grid-cols-4 grid-cols-5 gap-1">
                    {Images.map((e, i) => {
                      return (
                        <>
                          <div>
                            <Image
                              className="w-full hover:border-orange-500 border-2 cursor-pointer"
                              src={e.photo.url}
                              alt="p14"
                              key={i}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="lg:text-xs lg:pt-6 text-[0.5rem] pt-2 leading-3">
                Im&apos; a product description. I&apos;m a great place to add
                more details about your product such as sizing, material, care
                instructions and cleaning instructions.
              </p>
            </div>

            <div className="text-xs">
              <div className="lg:h-12 h-8">
                <div className="flex justify-end font-medium">
                  <div className="flex-none">
                    <a
                      href="#"
                      className="lg:font-medium lg:text-xs text-[0.5rem] font-base"
                    >
                      <span>&lt;&nbsp;</span>Prev
                    </a>
                  </div>
                  <span className="px-1 lg:text-xs text-[0.5rem]">|</span>
                  <div className="flex-initial">
                    <Link
                      href="#"
                      className="lg:font-medium lg:text-xs text-[0.5rem] font-base"
                    >
                      Next<span>&nbsp;&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="lg:font-bold font-medium lg:text-4xl text-xl">
                  <strong>{productData.name}</strong>
                </h1>
                <p className="lg:pt-0.5 lg:pb-0.5 pb-1 lg:text-sm text-[0.6rem]">
                  {`SKU:00${productData.id}`}
                </p>
                <span className="line-through text-orange-500 lg:text-base text-sm">
                  $42.00
                </span>
                <span className="text-orange-500 lg:text-base text-sm pl-2">
                  {"$" + productData.price}
                </span>
                <p className="lg:pt-2 pt-0.5 lg:text-sm text-[0.6rem]">Color</p>
                <div className="flex flex-initial lg:mt-2 mt-1">
                  <input
                    type="radio"
                    id="radio1"
                    name="color"
                    value="orange"
                    className="hidden"
                  />
                  <label
                    htmlFor="radio1"
                    className="lg:w-4 w-3 lg:h-4 h-3 lg:mr-2 mr-1.5 rounded-full bg-orange-500 cursor-pointer border-slate-400 border-[1px]"
                  ></label>

                  <input
                    type="radio"
                    id="radio2"
                    name="color"
                    value="black"
                    className="hidden"
                  />
                  <label
                    htmlFor="radio2"
                    className="lg:w-4 w-3 lg:h-4 h-3 rounded-full bg-white border-[1px] border-slate-400 cursor-pointer"
                  ></label>
                </div>

                <div>
                  <p className="lg:pt-4 pt-1.5 lg:pb-1 lg:text-sm text-[0.6rem]">
                    Size
                  </p>
                  <div className="w-full pt-1">
                    <select
                      id="size"
                      name="size"
                      className="block w-[55%] border border-gray-300 rounded-none lg:py-2 lg:px-3 px-0.5 text-[0.6rem] lg:text-base"
                    >
                      <option value="" disabled selected hidden>
                        Select size
                      </option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="xlarge">X-Large</option>
                    </select>
                  </div>
                </div>
                <p className="lg:pt-4 pt-1.5 lg:pb-2 pb-1 lg:text-sm text-[0.6rem]">
                  Quantity
                </p>
                <input
                  type="text"
                  id="number"
                  className="lg:text-slate-400 text-slate-200 bg-white lg:font-medium font-normal w-1/4 border-[1px] lg:border-slate-400 border-slate-200 lg:text-sm text-[0.6rem] lg:px-5 px-0.5 lg:py-1.5"
                  placeholder="1"
                />

                <div className="flex items-center space-x-2 lg:pt-4 pt-0.5">
                  {/* <Link href="/cart"> */}
                  <button
                    className="lg:my-2 my-[0.2rem] rounded-none border-2 border-transparent bg-orange-500 lg:px-4 lg:py-1.5 lg:font-semibold font-normal text-white hover:border-solid hover:border-orange-500 hover:bg-white hover:text-orange-500"
                    onClick={() => handleAddToCart(productData)}
                  >
                    Add to Cart
                  </button>
                  {/* </Link> */}

                  <Link href="/compare">
                    <button className="lg:my-2 my-[0.2rem] rounded-none border-2 border-transparent bg-orange-500 lg:px-4 lg:py-1.5 lg:font-semibold font-normal text-white hover:border-solid hover:border-orange-500 hover:bg-white hover:text-orange-500">
                      Add to Compare
                    </button>
                  </Link>

                  <button className="rounded-none lg:border-2 border-[0.1rem] border-solid border-orange-500 bg-white lg:px-1.5 lg:py-0.5 lg:font-bold text-center text-orange-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="lg:h-6 lg:w-6 w-4 h-4 text-center hover:fill-current"
                    >
                      a
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>

                <button className="w-full bg-black text-white lg:font-semibold font-normal lg:py-1.5 lg:px-4 px-1 rounded-none border-2 border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:border-solid">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h1 className="lg:text-3xl text-2xl text-center lg:pb-12 pb-8">
            <strong>Related Products</strong>
          </h1>
          <div>
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 lg:px-40 px-20">
              <div className="relative">
                <Image src={p15} alt="image" />
                <div className="absolute top-0">
                  <p className="bg-orange-500 lg:px-2 px-[0.5rem] text-center lg:text-xs text-[0.5rem] text-white">
                    Sale
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image src={p15} alt="image" />
              </div>
              <div className="relative">
                <Image src={p15} alt="image" />
              </div>
              <div className="relative">
                {/* <img
                  src="https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80a"
                  class="w-full"
                  alt=""
                /> */}
                <Image src={p15} alt="image" />
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </main>
    </>
  );
}
