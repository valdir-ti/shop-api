const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("List all products");
});

router.get("/:id", (req, res) => {
  res.send(`List an product: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Add an new product: ${req.params}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update the product: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete the product: ${req.params.id}`);
});

module.exports = router;
