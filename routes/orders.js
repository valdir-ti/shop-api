const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("List all orders");
});

router.get("/:id", (req, res) => {
  res.send(`List an order: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Add an new order: ${req.params}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update the order: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete the order: ${req.params.id}`);
});

module.exports = router;
