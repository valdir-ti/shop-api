const router = require("express").Router();
const CryptoJS = require("crypto-js");

const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      savedUser,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({username: req.body.username})
    !user && res.status(401).json({message: "Wrong username or password"})

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)

    const passwordHash = hashedPassword.toString(CryptoJS.enc.Utf8)
    passwordHash !== req.body.password && res.status(401).json({message: "Wrong username or password"})

    const { email, username, _id, isAdmin } = user

    res.status(200).json({_id, username, email, isAdmin});

  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }

})

module.exports = router;
