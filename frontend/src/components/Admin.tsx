import React from "react";
import Navbar from "./Navbar";
import axios from "axios";

const ProductManagementForm = () => {
  const handleActionSubmit = async (e) => {
    e.preventDefault();
    const selectedAction = e.target.action.value;

    // Hide  forms initially
    hideCreateProductForm();
    hideProductsForDelete();
    hideUpdateForm();
    hideProductsForUpdate();

    if (selectedAction === "") {
      alert("Please select an action");
    } else {
      if (selectedAction === "create") {
        showCreateProductForm();
      } else if (selectedAction === "delete") {
        showProductsForDelete();
        await fetchAndDisplayProducts();
      } else if (selectedAction === "update") {
        showProductsForUpdate();
        await fetchAndDisplayProducts();
      }
    }
  };

  const showCreateProductForm = () => {
    const createForm = document.getElementById("createForm");
    createForm.style.display = "block";
  };

  const hideCreateProductForm = () => {
    const createForm = document.getElementById("createForm");
    createForm.style.display = "none";
  };

  const showProductsForDelete = () => {
    const productsForDelete = document.getElementById("productsForDelete");
    productsForDelete.style.display = "grid";
  };

  const showProductsForUpdate = () => {
    const productsForUpdate = document.getElementById("productsForUpdate");
    if (productsForUpdate) {
      productsForUpdate.style.display = "grid";
    }
  };

  const hideProductsForDelete = () => {
    const productsForDelete = document.getElementById("productsForDelete");
    productsForDelete.style.display = "none";
  };

  const hideProductsForUpdate = () => {
    const productsForUpdate = document.getElementById("productsForUpdate");
    productsForUpdate.style.display = "none";
  };

  const hideUpdateForm = () => {
    const updateForm = document.getElementById("updateForm");
    updateForm.style.display = "none";
  };

  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: e.target.name.value,
      issale: e.target.issale.checked,
      quantity: parseInt(e.target.quantity.value),
      price: parseFloat(e.target.price.value),
      brand: e.target.brand.value,
      rating: parseFloat(e.target.rating.value),
      photoUrl: e.target.photoUrl.value,
      category: e.target.category.value,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/products",
        productData,
      );

      if (response.status === 201) {
        alert("Product created successfully!");
        clearCreateProductForm();
      } else {
        alert(`Product creation failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating the product");
    }
  };

  // Function to clear the create product form
  const clearCreateProductForm = () => {
    const form = document.getElementById("createForm");
    if (form) {
      form.reset(); // Reset the form to clear input fields
    }
  };

  const fetchAndDisplayProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/v1/products");
      const productsData = response.data.data; // Access the 'data' property
      const products = productsData.products; // Access the 'products' array

      console.log("Fetched products:", products);

      if (Array.isArray(products)) {
        displayProductsForDelete(products);
        displayProductsForUpdate(products);
      } else {
        console.error("Invalid products data:", products);
        alert("An error occurred while fetching the products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching the products");
    }
  };

  const displayProductsForDelete = (products: any[]) => {
    const productsGrid = document.getElementById("productsForDelete");
    if (productsGrid) {
      productsGrid.innerHTML = "";

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "border p-4";
        productCard.id = `product-${product._id}`;

        const imageElement = document.createElement("img");
        imageElement.src = product.photoUrl;
        imageElement.alt = product.name;
        imageElement.style.maxWidth = "100px"; // Adjust the width as needed
        imageElement.classList.add("mb-2"); // Add margin-bottom
        productCard.appendChild(imageElement);

        const detailsElement = document.createElement("div");
        detailsElement.innerHTML = `
          <strong>Name:</strong> ${product.name}<br>
          <strong>Price:</strong> $${product.price}<br>
          <strong>Brand:</strong> ${product.brand}<br>
        `;
        productCard.appendChild(detailsElement);

        const deleteButton = document.createElement("button");
        deleteButton.className = "bg-red-500 text-white py-2 px-4 mt-2 rounded";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () =>
          handleDeleteProduct(product._id),
        );
        productCard.appendChild(deleteButton);

        if (productsGrid) {
          productsGrid.appendChild(productCard);
        }
      });
    }
  };

  const displayProductsForUpdate = (products) => {
    const productsGrid = document.getElementById("productsForUpdate");
    if (productsGrid) {
      productsGrid.innerHTML = "";

      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "border p-4";
        productCard.id = `product-${product._id}`;

        const imageElement = document.createElement("img");
        imageElement.src = product.photoUrl;
        imageElement.alt = product.name;
        imageElement.style.maxWidth = "100px"; // Adjust the width as needed
        imageElement.classList.add("mb-2"); // Add margin-bottom
        productCard.appendChild(imageElement);

        const detailsElement = document.createElement("div");
        detailsElement.innerHTML = `
          <strong>Name:</strong> ${product.name}<br>
          <strong>Price:</strong> $${product.price}<br>
          <strong>Brand:</strong> ${product.brand}<br>
        `;
        productCard.appendChild(detailsElement);

        const updateButton = document.createElement("button");
        updateButton.className =
          "bg-blue-500 text-white py-2 px-4 mt-2 rounded";
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => showUpdateForm(product));
        productCard.appendChild(updateButton);

        if (productsGrid) {
          productsGrid.appendChild(productCard);
        }
      });
    }
  };

  const showUpdateForm = (product) => {
    const updateForm = document.getElementById("updateForm");
    if (updateForm) {
      updateForm.style.display = "block";

      document.getElementById("updateName").value = product.name;
      document.getElementById("updatePrice").value = product.price;
      // ... set values for other fields

      updateForm.onsubmit = (e) => handleUpdateProductSubmit(e, product._id);
    }
  };

  const handleUpdateProductSubmit = async (e, productId) => {
    e.preventDefault();

    const updatedProductData = {
      name: e.target.updateName.value,
      price: parseFloat(e.target.updatePrice.value),
      // ... (update other fields)
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/products/${productId}`,
        updatedProductData,
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        hideUpdateForm();
        await fetchAndDisplayProducts();
      } else {
        alert(`Product update failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      console.log(error);
      alert("An error occurred while updating the product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/v1/products/${productId}`,
      );

      if (response.status === 204) {
        alert("Product deleted successfully!");
        removeProductFromDOM(productId);
      } else {
        alert(`Product deletion failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product");
    }
  };

  const removeProductFromDOM = (productId) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (productElement) {
      productElement.remove();
    }
  };

  return (
    <div className="lg:px-16 lg:py-2 px-6">
      <Navbar />
      <div className="lg:px-16 lg:py-2 px-6">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 w-1/2 ml-80"
          onSubmit={handleActionSubmit}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Product Management</h2>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="action"
            >
              Select Action
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="action"
              required
            >
              <option value="">-- Select --</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Create Form */}

        <form
          id="createForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-1/2 ml-80"
          style={{ display: "none" }}
          onSubmit={handleCreateProductSubmit}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Create Product</h2>
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
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="brand"
              type="text"
              placeholder="Brand"
              required
            />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                required
              >
                <option value="">-- Select Category --</option>
                <option value="men">men</option>
                <option value="women">women</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rating"
              type="number"
              placeholder="Rating"
              step="0.1"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="issale"
            >
              On Sale
            </label>
            <input
              className="mr-2 leading-tight"
              id="issale"
              type="checkbox"
              name="issale"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              placeholder="Quantity"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photoUrl"
            >
              Photo URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photoUrl"
              type="url"
              placeholder="Photo URL"
              required
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Product
            </button>
          </div>
        </form>

        {/* Display Products For Delete */}
        <div>
          <div
            id="productsForDelete"
            className="grid grid-cols-3 gap-6 mt-4"
          ></div>
        </div>

        {/* Display Products For Update */}
        <div id="productsForUpdate" className="grid grid-cols-3 gap-6 mt-4">
          {/* You need to create a similar loop here to display products */}
        </div>

        {/* Update Form */}
        <form
          id="updateForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-1/2 ml-80"
          style={{ display: "none" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="updateName"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="updateName"
              type="text"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="updatePrice"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="updatePrice"
              type="number"
              placeholder="Price"
              step="0.01"
              required
            />
          </div>
          {/* ... other input fields ... */}
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={hideUpdateForm}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ml-4"
              type="submit"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductManagementForm;
