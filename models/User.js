const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    cpf: { type: String, required: false, unique: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
