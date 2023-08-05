/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import LoginForm from './LoginForm';

import { useRouter } from "next/router";
import axios from "axios";

const RegisterForm = () => {
  const router = useRouter();
  const handleRegister = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    // console.log(name, email, password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        {
          name,
          email,
          password,
          passwordConfirm,
        },
      );
      console.log("Registration successful!");

      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
      onSubmit={handleRegister}
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Create an Account</h2>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
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
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="******************"
          name="passwordConfirm"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          className="mr-2 leading-tight"
          id="agreedToTerms"
          type="checkbox"
        />
        <label className="text-gray-700 text-sm" htmlFor="agreedToTerms">
          I agree to the{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Terms and Conditions
          </span>
        </label>
      </div>
      <div className="flex items-center justify-center mt-6">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
      <div className="text-center mt-4">
        <span className="text-gray-600 text-sm">Already have an acocunt? </span>
        <button className="text-blue-500 font-semibold hover:text-blue-600 cursor-pointer">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
