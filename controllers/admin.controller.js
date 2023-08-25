const Product = require("../models/product.model");
const Order = require("../models/order.model");

async function getProducts(req, res) {
  try {
    const allProducts = await Product.findAll();
    res.render("admin/products/all-products.ejs", { products: allProducts });
  } catch (error) {
    next(error);
    return;
  }
}

async function createNewProducts(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product.ejs", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.delete();
  } catch (error) {
    next(error);
    return;
  }

  res.json({ message: "delete product" });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  createNewProducts: createNewProducts,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
};
