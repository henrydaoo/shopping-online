function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    next();
    return;
  }

  res.locals.user = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuthStatus;
