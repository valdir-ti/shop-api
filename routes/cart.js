const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("List all carts");
});

router.get("/:id", (req, res) => {
  res.send(`List an cart: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Add an new cart: ${req.params}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update the cart: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete the cart: ${req.params.id}`);
});

module.exports = router;
