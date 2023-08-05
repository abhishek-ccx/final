/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        {
          email,
          password,
        },
      );
      // Store the token in local storage after successful login
      localStorage.setItem("token", response.data.token);
      // Redirect to the homepage after successful login
      router.push("/");
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleLogin}
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Sign In</h2>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          // required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          name="password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          // required
        />
      </div>
      <div className="mb-4"></div>
      <div className="flex items-center justify-center mt-6">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
      <div className="text-center mt-6">
        <span className="text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
        </span>
        <a
          href="/register"
          className="text-blue-500 font-semibold hover:text-blue-600 cursor-pointer"
          // onClick={onToggleForm}
        >
          Create one
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
