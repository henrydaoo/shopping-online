const express = require("express");
const path = require("path");
const session = require("express-session");

const PORT = process.env.PORT || 3000;

const app = express();
const db = require("./data/database");

const sessionConfig = require("./config/session");
const errorHandleMiddleware = require("./middlewares/error-handle");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const cartMiddleware = require("./middlewares/cart");
const notFoundHandleMiddleware = require("./middlewares/not-found");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const baseRoutes = require("./routes/base.routes");
const adminroutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/products/assets", express.static("product-data"));
app.use(express.json());

app.use(session(sessionConfig()));

app.use(checkAuthStatusMiddleware);
app.use(cartMiddleware);

app.use(authRoutes);
app.use(productRoutes);
app.use(baseRoutes);
app.use("/admin", adminroutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandleMiddleware);
app.use(notFoundHandleMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(PORT);
  })
  .catch(function (error) {
    console.log("Fail to connect to database");
    console.log(error);
  });
