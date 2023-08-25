const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/product", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
