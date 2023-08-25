const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;
  const cartSession = req.session.cart;
  if (cartSession) {
    cart = new Cart(
      cartSession.items,
      cartSession.totalQuantity,
      cartSession.totalPrice
    );
  } else {
    cart = new Cart();
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
