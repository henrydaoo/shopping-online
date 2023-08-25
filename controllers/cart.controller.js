const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "card updated",
    newTotalItems: cart.totalQuantity,
  });
}

function getCart(req, res) {
  res.render("../views/customer/cart/cart.ejs");
}

function updateCart(req, res) {
  const quantity = req.body.quantity;
  const productId = req.body.productId;
  const cart = res.locals.cart;
  const updatedData = cart.upDateCart(productId, +quantity);
  req.session.cart = cart;

  res.json({
    message: "item updated",
    newTotalQuantity: cart.totalQuantity,
    newTotalPrice: cart.totalPrice,
    updatedItemPrice: updatedData.updatedItemPrice,
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCart: updateCart,
};
