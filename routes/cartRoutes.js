const express = require("express");
const cartRoutes = express.Router();
const {
  showDashboard,
  showCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cartController");

cartRoutes.get("/dashboard", showDashboard);
cartRoutes.get("/cart", showCart);
cartRoutes.post("/addtocart", addToCart);
cartRoutes.post("/cart/increase/:id", increaseQuantity);
cartRoutes.post("/cart/decrease/:id", decreaseQuantity);

module.exports = { cartRoutes };
