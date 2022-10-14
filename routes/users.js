const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.get("/", (req, res) => {
  res.send("List all users");
});

router.get("/:id", (req, res) => {
  res.send(`List an user: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Add an new user: ${req.params}`);
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
    res.status(403).json({ message: "You are not alowed to do that" });
  }
});

router.delete("/:id", (req, res) => {
  res.send(`Delete the user: ${req.params.id}`);
});

module.exports = router;
