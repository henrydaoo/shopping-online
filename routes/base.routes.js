const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/product");
});

module.exports = router;
