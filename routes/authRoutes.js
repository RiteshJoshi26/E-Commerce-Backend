const express = require("express");
const {
  handleSignup,
  showSignup,
  showLogin,
  handleLogin,
  handleLogout,
} = require("../controllers/authController");
const authRoutes = express.Router();

authRoutes.get("/", showSignup);
authRoutes.post("/signup", handleSignup);
authRoutes.get("/login", showLogin);
authRoutes.post("/login", handleLogin);
authRoutes.get("/logout", handleLogout);
module.exports = {
  authRoutes,
};
