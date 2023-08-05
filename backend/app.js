const express = require("express");
const ProductRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
// const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// app.set("view engine", "html");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//   res.status(200).render("index.html");
// });

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
module.exports = app;
