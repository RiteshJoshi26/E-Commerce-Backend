const { Cart } = require("../models/cartModel");
const { Bag } = require("../models/bagModel");
const { User } = require("../models/userModel");

async function showDashboard(req, res) {
  const showBag = await Bag.find();
  res.render("dashboard", { showBag });
}

async function addToCart(req, res) {
  try {
    const userId = req.user.id || req.user._id;
    const { bagId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if bag already exists in cart
    const itemIndex = cart.items.findIndex((i) => i.bag.toString() === bagId);

    if (itemIndex > -1) {
      // If already in cart → increase quantity
      cart.items[itemIndex].quantity += 1;
    } else {
      // Else push as new item
      cart.items.push({ bag: bagId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/profile/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
}

async function showCart(req, res) {
  try {
    const userId = req.user.id || req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.bag");

    if (!cart || cart.items.length === 0) {
      return res.render("cart", {
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      });
    }

    const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.items.reduce(
      (sum, i) => sum + i.quantity * i.bag.price,
      0
    );

    res.render("cart", {
      cartItems: cart.items,
      totalItems,
      totalPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading cart");
  }
}

async function increaseQuantity(req, res) {
  try {
    const userId = req.user.id || req.user._id;
    const bagId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.redirect("/profile/cart");

    const item = cart.items.find((i) => i.bag.toString() === bagId);
    if (item) {
      item.quantity += 1;
      await cart.save();
    }

    res.redirect("/profile/cart");
  } catch (err) {
    console.error("Error increasing quantity:", err);
    res.status(500).send("Error increasing quantity");
  }
}

// ---------------- Decrease Quantity ----------------
async function decreaseQuantity(req, res) {
  try {
    const userId = req.user.id || req.user._id;
    const bagId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.redirect("/profile/cart");

    const item = cart.items.find((i) => i.bag.toString() === bagId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        // remove item if quantity 0
        cart.items = cart.items.filter((i) => i.bag.toString() !== bagId);
      }
      await cart.save();
    }

    res.redirect("/profile/cart");
  } catch (err) {
    console.error("Error decreasing quantity:", err);
    res.status(500).send("Error decreasing quantity");
  }
}

module.exports = {
  showDashboard,
  showCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
};
