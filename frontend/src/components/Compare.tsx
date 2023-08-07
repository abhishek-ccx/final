/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { ProductContext } from "@/contexts/ProductContext";

export default function Compare() {
  const { compareItems, removeFromCompare } = useContext(CartContext) as any;
  const { setProductData } = useContext(ProductContext) as any;

  const removeHandler = (id: any) => {
    removeFromCompare(id);
  };

  const handleData = (e: any) => {
    setProductData(e);
  };

  // console.log(compareItems);
  return (
    <>
      <Navbar></Navbar>
      <SocialMedia />
      <div className="text-center p-10">
        <div className="flex justify-center">
          <div className="mt-8 px-3 border-b-8 border-orange-500">
            <p className="text-black text-5xl  bg-blend-color relative top-3 uppercase">
              comparisons
            </p>
          </div>
        </div>
      </div>
      <section className="py-4">
        <div className="grid grid-cols-5 m-auto text-center w-[80%] gap-[1px]">
          <div className="bg-orange-200 relative ml-10">
            <div className="absolute w-full bottom-0">
              <div className="py-4 border border-white">Name</div>
              <div className="py-4 border border-white">Brand</div>
              <div className="py-4 border border-white">Ratings</div>
              <div className="py-4 border border-white">Price</div>
              <div className="py-4 border border-white">
                <button
                  className="rounded border-2 border-transparent bg-orange-500 py-0.5 px-2 lg:font-semibold font-normal text-white hover:border-solid hover:border-orange-500 hover:bg-white hover:text-orange-500 "
                  // onClick={handleAddToCart}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          {compareItems.map((e: any, i: any) => {
            return (
              <>
                <div className="bg-orange-100">
                  <div key={i}>
                    <Link href="/pdp">
                      <Image
                        src={e.photo.url}
                        className="h-30"
                        alt="p14"
                        onClick={() => handleData(e)}
                      />
                    </Link>
                  </div>
                  <div className="py-4 border-y border-white">{e.name}</div>
                  <div className="py-4 border-y border-white">{e.brand}</div>
                  <div className="py-4 border-y border-white">{e.ratings}</div>
                  <div className="py-4 border-y border-white">
                    {"$" + e.price.toFixed(2)}
                  </div>
                  <div className="py-4 border-y border-white">
                    <button
                      className="rounded border-2 border-transparent bg-orange-500 py-0.5 px-2 lg:font-semibold font-normal text-white hover:border-solid hover:border-orange-500 hover:bg-white hover:text-orange-500 "
                      onClick={() => removeHandler(e.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}
