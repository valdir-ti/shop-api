const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(403).json({ message: "You are not alowed to do that" });
  }
});

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(403).json({ message: "You are not alowed to do that" });
  }
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

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `User has been deleted: ${req.params.id}` });
  } catch (error) {
    res.status(403).json({ message: "You are not alowed to do that" });
  }
});

module.exports = router;
