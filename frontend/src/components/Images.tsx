/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ProductContext } from "@/contexts/ProductContext";
// import { fetchData } from "@/lib/fetchData";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import router from "next/router";
// import { useContext } from "react";

const ImagesComp = () => {
  const handleData = (productId: any) => {
    router.push(`/pdp?productId=${productId}`);
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   // Redirect to the login page if the user is not authenticated
        //   router.push("/login");
        // } else {
        const res = await axios.get(
          `http://127.0.0.1:3000/api/v1/products/`,
          // { headers: { authorization: localStorage.getItem("token") } },
        );
        setProducts(res.data.data.products);
        setLoading(false);
        // }
      } catch (err) {
        console.error("Error in fetching data: ", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {products?.map((e: any, i: any) => {
        return (
          <div key={i}>
            <div className="relative">
              <Link href="/pdp">
                <Image
                  src={e.photoUrl}
                  alt={"image"}
                  key={i}
                  width={500}
                  height={500}
                  onClick={() => handleData(e._id)}
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
