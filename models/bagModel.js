const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema(
  {
    bagName: {
      type: String,
      required: true,
    },
    imgurl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Bag = mongoose.model("bag", bagSchema);

module.exports = {
  Bag,
};
