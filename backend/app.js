const express = require("express");
const ProductRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");

const app = express();
app.use(express.json());

// app.set("view engine", "html");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//   res.status(200).render("index.html");
// });

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;
