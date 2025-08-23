const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // User model ko refer karega
      required: true,
    },
    items: [
      {
        bag: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bag", // Bag model ko refer karega
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart };
