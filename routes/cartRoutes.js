const express = require("express");
const cartRoutes = express.Router();
const {
  showDashboard,
  showCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/cartController");

cartRoutes.get("/dashboard", showDashboard);
cartRoutes.get("/cart", showCart);
cartRoutes.post("/addtocart", addToCart);
cartRoutes.post("/cart/increase/:id", increaseQuantity);
cartRoutes.post("/cart/decrease/:id", decreaseQuantity);
cartRoutes.post("/removefromcart/:id", removeFromCart);

module.exports = { cartRoutes };
