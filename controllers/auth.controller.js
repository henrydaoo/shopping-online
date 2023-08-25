const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const userValidation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignUp(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      fullname: "",
      street: "",
      city: "",
    };
  }
  res.render("../views/customer/auth/signup.ejs", { inputData: sessionData });
}

function getLogIn(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("../views/customer/auth/login.ejs", { inputData: sessionData });
}

async function signUp(req, res, next) {
  const enterData = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    city: req.body.city,
  };
  if (
    !userValidation.userDetailAraValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.city
    )
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Please check your input",
        ...enterData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.city
  );

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "User exists alreday! Try logging in instead",
        ...enterData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

async function logIn(req, res, next) {
  const sessionErrorData = {
    errorMessage: "please double-check your email and password",
    email: req.body.email,
    password: req.body.password,
  };
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        ...sessionErrorData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  let passwordIsCorrect;
  try {
    passwordIsCorrect = await user.hasMatchPassword(existingUser.password);
  } catch (error) {
    next(error);
    return;
  }

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        ...sessionErrorData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logOut(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogIn: getLogIn,
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
};
