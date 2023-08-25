const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.post("/item", cartController.addCartItem);
router.get("/", cartController.getCart);
router.patch("/items", cartController.updateCart);

module.exports = router;
