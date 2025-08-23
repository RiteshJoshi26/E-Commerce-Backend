const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function showSignup(req, res) {
  res.render("signup");
}

async function handleSignup(req, res) {
  const { username, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createUser = await User.create({
        username,
        email,
        password: hash,
      });
      res.redirect("/login");
    });
  });
}

async function showLogin(req, res) {
  res.render("login");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) return res.status(401).send("Email or Password Incorrect");
  bcrypt.compare(password, findUser.password, (err, result) => {
    if (result) {
      const token = jwt.sign(
        { id: findUser._id, email, role: findUser.role },
        process.env.Secret_Key
      );
      res.cookie("token", token);
      if (findUser.role === "User") {
        return res.redirect("/profile/dashboard");
      }
      res.redirect("/admin/bag");
    } else return res.status(401).send("Email or Password Incorrect");
  });
}

async function handleLogout(req, res) {
  res.clearCookie("token");
  res.render("login");
}

module.exports = {
  showSignup,
  handleSignup,
  showLogin,
  handleLogin,
  handleLogout,
};
