/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/AddProduct.js

import React from "react";
import axios from "axios";

const AddProduct = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      issale: e.target.issale.checked,
      quantity: parseInt(e.target.quantity.value),
      price: parseFloat(e.target.price.value),
      brand: e.target.brand.value,
      rating: parseFloat(e.target.rating.value),
      photoUrl: e.target.photoUrl.value,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/products/`,
        formData,
      );
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response.data.err.message);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Is on Sale:
          <input type="checkbox" name="issale" />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" name="quantity" />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" />
        </label>
        <br />
        <label>
          Brand:
          <input type="text" name="brand" />
        </label>
        <br />
        <label>
          Rating:
          <input type="number" name="rating" />
        </label>
        <br />
        <label>
          Photo URL:
          <input type="text" name="photoUrl" />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
