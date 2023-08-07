import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import bag from "./../img/bag.jpg";
import user from "./../img/user.png";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/users/getuserrole", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setUserRole(response.data.data.role);
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
        setUserRole("");
      });
  }, []);

  const handleLogout = (e) => {
    // Remove the token from local storage on logout
    e.preventDefault();
    localStorage.removeItem("token");
    // Redirect to the login page after logout
    router.push("/login");
  };

  const isAdmin = userRole === "admin";

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push("/admin");
    } else {
      alert("You do not have permission to access the Admin section.");
      router.push("/");
      // Alternatively, you can redirect to another page
      // router.push("/some-other-page");
    }
  };

  return (
    <>
      <div className="navbar">
        <nav className="bg-slate-50 dark:bg-slate-50">
          <div className="flex justify-between ..">
            <div className="side-left">
              <div className="max-w-screen-xl py-3 mx-auto">
                <div className="p-1 bg-black">
                  <Link href="/">
                    <h1 className="text-white tracking-wide">NOUS</h1>
                  </Link>
                </div>
              </div>
            </div>
            <div className="side-right">
              <div className="navbar-container__1">
                <div className="relative">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-black bg-white dark:bg-white "
                    required
                  />
                  <label
                    htmlFor="default-search"
                    className="absolute inset-y-0 left-7 flex items-center pl-3 pointer-events-none text-black dark:text-black dark:placeholder-transparent"
                  >
                    Search...
                  </label>
                  <svg
                    className="absolute w-4 h-4 left-3 bottom-4 text-gray-500 dark:text-black
  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="max-w-screen-xl pl-4 pr-0 py-3 mx-auto mr-0">
              <div className="flex">
                <ul className="hidden lg:flex lg:flex-row items-center font-medium mr-6 space-x-8 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-black dark:text-black hover:text-orange-400"
                      aria-current="page"
                    >
                      Shop All
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="./product_listing.html"
                      className="text-black dark:text-black hover:text-orange-400"
                    >
                      Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-black dark:text-black hover:text-orange-400"
                    >
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-black dark:text-black hover:text-orange-400"
                    >
                      Sale
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="text-black dark:text-black hover:text-orange-400"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-black dark:text-black hover:text-orange-400"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <button
                      className="text-black dark:text-black hover:text-orange-400"
                      onClick={handleAdminClick}
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <div className="h-6 w-6">
                        <Image src={user} className="w-full" alt="user-logo" />
                      </div>
                      {isLoggedIn ? (
                        <div className="pl-2">
                          <button
                            className="text-black dark:text-black hover:text-orange-400"
                            onClick={handleLogout}
                          >
                            Log out
                          </button>
                        </div>
                      ) : (
                        <div className="pl-2">
                          <Link
                            href="/login"
                            className="text-black dark:text-black hover:text-orange-400"
                          >
                            Login
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link href="/cart" className="flex items-center">
                      <div className="h-6 w-6 relative">
                        <Image src={bag} className="w-full" alt="bag-logo" />
                      </div>
                    </Link>
                  </li>
                </ul>

                <button className="block lg:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group">
                  <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                  <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                  <div className="w-5 h-1 bg-gray-600"></div>
                  <div className="hidden absolute top-0 -right-full opacity-0 h-screen w-8/12 bg-white border transform group-focus:right-0 group-focus:opacity-100 transition-all duration-300">
                    <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-10">
                      <li className="hover:bg-gray-100  hover:text-orange-400 text-black py-4 px-6 w-full">
                        <Link href="#">Women</Link>
                      </li>
                      <li className="hover:bg-gray-100  hover:text-orange-400 text-black py-4 px-6 w-full">
                        Men
                      </li>
                      <li className="hover:bg-gray-100  hover:text-orange-400 text-black py-4 px-6 w-full">
                        Sale
                      </li>
                      <li className="hover:bg-gray-100  hover:text-orange-400 text-black py-4 px-6 w-full">
                        About
                      </li>
                      <li className="hover:bg-gray-100  hover:text-orange-400 text-black py-4 px-6 w-full">
                        Contact
                      </li>
                      <li>
                        <Link href="#" className="flex items-center">
                          <div className="h-6 w-6">
                            <Image
                              src={user}
                              className="w-full"
                              alt="user-logo"
                            />
                          </div>
                          <span className="text-black dark:text-black hover:text-orange-400">
                            Log off
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center">
                          <div className="h-6 w-6">
                            <Image
                              src={bag}
                              className="w-full"
                              alt="bag-logo"
                            />
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
