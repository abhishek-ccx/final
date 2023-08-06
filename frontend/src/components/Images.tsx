/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/api/v1/products`, {
        params: {
          page,
          limit: 8,
        },
      });
      setProducts(res.data.data.products);
      setTotalPages(res.data.data.totalPages); // Use totalPages from the API response
      setLoading(false);
    } catch (err) {
      console.error("Error in fetching data: ", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
  };

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

      <div className="flex justify-center mt-4">
        <button
          className="mx-2 px-3 py-1 bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`mx-2 px-3 py-1 ${
                currentPage === page ? "bg-gray-800 text-white" : "bg-gray-300"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ),
        )}
        <button
          className="mx-2 px-3 py-1 bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export { ImagesComp };
