const User = require("./../models/userModel");
const Product = require("./../models/productModel");

exports.addCart = async (req, res) => {
  try {
    // console.log(req.body.id);
    // const product = await User.Cart.findOne({ _id: id });
    const userId = req.user._id;

    // Find the user in the database by their ID
    const user = await User.findById(userId);

    // If the user is found, add the product to their cart
    if (user) {
      user.cart.push({ ...req.body });
      await user.save({ validateBeforeSave: false });
      console.log("Product added successfully!");
      res.status(200).json({
        status: "ok",
        message: user.cart,
      });
    } else {
      throw new Error("User not found while adding to cart!", 404);
    }
  } catch (err) {
    res.status(404).json(console.log(err));
  }
};

exports.getAllCart = async (req, res) => {
  const userID = req.user;
  try {
    const isUser = await User.findById(userID);
    if (!isUser) {
      throw new Error("User not found while showing cart!", 404);
    }
    let cartArray = [];
    let cartItems = isUser.cart;
    for (let cart of cartItems) {
      // console.log(cart.product);
      const product = await Product.findById(cart.product);
      cartArray.push(product);
    }
    return res.status(200).json({
      status: "ok",
      data: cartArray,
    });
  } catch (error) {
    res.status(400).json({
      status: "error!",
      message: error.message,
    });
  }
};

exports.getCartProduct = async (req, res) => {
  try {
    const cartProduct = await Product.findById(req.params.id.trim());
    if (!product) {
      throw new Error("product not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        cartProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
