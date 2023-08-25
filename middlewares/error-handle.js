function errorHandle(error, req, res, next) {
  res.status(500).render("../views/shared/500.ejs");
  next();
}

module.exports = errorHandle;
