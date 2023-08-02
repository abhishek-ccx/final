/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import p1 from "./../img/p1.jpg";
import p2 from "./../img/p2.jpg";
import p3 from "./../img/p3.jpg";
import Navbar from "./Navbar";
import SocialMedia from "./SocialMedia";
import Footer from "./Footer";
import { ImagesComp } from "./Images";

const HomePage = () => {
  return (
    <>
      <main className="lg:px-16 lg:py-7 px-6 py-2">
        <Navbar></Navbar>
        <SocialMedia></SocialMedia>

        <section>
          <div className="bg-orange-500">
            <div>
              <p className="pt-7 text-white uppercase lg:text-lg text-base text-center tracking-wide font-normal">
                free shipping
              </p>
            </div>
            <div className="pt-2 text-white uppercase lg:text-base text-center text-sm tracking-normal font-normal">
              on orders over $50 - use coupan code over50
            </div>
            <div className="px-auto py-8 text-center">
              <button className="bg-transparent hover:bg-white text-white font-medium hover:text-orange-500 py-1 lg:px-14 px-1 border-2 border-white hover:border-transparent lg:mr-3">
                Shop Women
              </button>
              <button className="bg-transparent hover:bg-white text-white font-medium hover:text-orange-500 py-1 lg:px-14 px-2 border-2 border-white hover:border-transparent">
                Shop Men
              </button>
              <button className="bg-transparent hover:bg-white text-white font-medium hover:text-orange-500 py-1 lg:px-14 px-2 border-2  border-white hover:border-transparent lg:ml-3">
                Shop Sale
              </button>
            </div>
          </div>
        </section>

        <div className="mt-2">
          <div className="grid lg:grid-cols-7 grid-cols-2 gap-2">
            <div className="lg:col-span-2">
              <Image src={p1} className="w-full bg-black" alt="p1" />
            </div>
            <div className="lg:col-span-2">
              <Image src={p2} className="w-full bg-black" alt="p2" />
            </div>
            <div className="bg-black w-full col-span-2 lg:col-span-3">
              <Image src={p3} className="w-full h-full bg-black" alt="p3" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-center p-10">
            <div className="flex justify-center">
              <div className="mt-8 px-3 border-b-8 border-orange-500">
                <p className="text-black text-5xl  bg-blend-color relative top-3">
                  NEW ARRIVALS
                </p>
              </div>
            </div>
          </div>
          <div className="pb-12">
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-12 gap-8">
              <ImagesComp></ImagesComp>
            </div>
          </div>
        </div>
        <div className="pb-10 text-center">
          <button className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 lg:px-14 px-8 border border-orange-500 hover:border-transparent none">
            Shop All
          </button>
          <button className="bg-orange-500 hover:bg-white-500 text-white-500 font-semibold hover:text-orange py-2 px-4 border ml-1 border-orange-500 hover:border-transparent none text-white">
            &#8250;
          </button>
        </div>

        <Footer></Footer>
      </main>
    </>
  );
};

export default HomePage;
