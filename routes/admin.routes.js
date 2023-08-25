const express = require("express");
const adminController = require("../controllers/admin.controller");
const uploadImageMiddleware = require("../middlewares/upload-image");

const router = express.Router();

router.get("/products", adminController.getProducts);
router.post(
  "/products",
  uploadImageMiddleware,
  adminController.createNewProducts
);
router.get("/products/:id", adminController.getUpdateProduct);
router.post(
  "/products/:id",
  uploadImageMiddleware,
  adminController.updateProduct
);
router.delete("/products/:id", adminController.deleteProduct);
router.get("/orders", adminController.getOrders);

module.exports = router;
