const express = require("express");
const {
  addCart,
  getAllCart,
  getCartProduct,
} = require("./../controllers/cartController");

const router = express.Router();

const { authenticate } = require("./../controllers/authController");
router.patch("/addcart", authenticate, addCart);
router.get("/getallcart", authenticate, getAllCart);
// router.get("/getcartproduct/:id", authenticate, getCartProduct);

module.exports = router;
