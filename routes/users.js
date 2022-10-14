const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isActive: true });

    res.status(200).json(users);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { _id, username, email, isAdmin, isActive, cpf } = user;
      res.status(200).json({ _id, username, email, isAdmin, isActive, cpf });
    } else {
      res.status(403).json({ messsage: "User not found" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newUser = new User({
    cpf: req.body.cpf,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `User has been deleted: ${req.params.id}` });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

module.exports = router;
