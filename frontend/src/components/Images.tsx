/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductContext } from "@/contexts/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const ImagesComp = () => {
  const { products, productData, setProductData } = useContext(
    ProductContext,
  ) as any;

  const handleData = (e: any) => {
    setProductData(e);
  };

  return (
    <>
      {products?.map((e: any, i: any) => {
        return (
          <div key={i}>
            <div className="relative">
              <Link href="/pdp">
                {/* {console.log(e)} */}
                <Image
                  src={e.photo.url}
                  alt={"image"}
                  key={i}
                  onClick={() => handleData(e)}
                ></Image>
                {e.isSale ? (
                  <div className="absolute top-0">
                    <p className="bg-orange-500 lg:px-2 px-[0.5rem] text-center lg:text-xs text-[0.5rem] text-white">
                      Sale
                    </p>
                  </div>
                ) : null}
              </Link>
              <div className="text-left pt-2">
                <p className="text-sm">I&apos;m a product</p>
                <p className="text-orange-400 text-sm">
                  {"$" + e.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { ImagesComp };
