const express = require("express");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
} = require("./../controllers/userController");

const {
  signup,
  forgetPassword,
  login,
  resetPassword,
  updatePassword,
} = require("./../controllers/authController");

const { authenticate } = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/forgetpassword", forgetPassword);
// router.patch("/resetpassword/:token", resetPassword);
// router.patch("/updatepassword", protect, updatePassword);
router.delete("/deleteme", authenticate, deleteMe);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
