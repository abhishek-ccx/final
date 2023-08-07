const express = require("express");
const ProductRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const errorMiddleware = require("./error/errMiddleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorMiddleware);
module.exports = app;
