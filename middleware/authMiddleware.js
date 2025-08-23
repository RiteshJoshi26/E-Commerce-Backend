const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Please Login");
  } else {
    const decoded = jwt.verify(token, process.env.Secret_Key);
    req.user = decoded;
    next();
  }
}

async function isAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Access Denied");
  } else {
    const decoded = jwt.verify(token, process.env.Secret_Key);
    req.user = decoded;
    if (decoded.role === "Admin") {
      return next();
    }
    res.status(401).send("Access Denied"); 
  }
}

module.exports = {
  authMiddleware,
  isAdmin,
};
