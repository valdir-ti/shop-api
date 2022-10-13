const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    defaultImg: { type: String, required: true },
    img: { type: Array },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", ProductSchema);
