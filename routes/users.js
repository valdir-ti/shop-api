const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("List all users");
});

router.get("/:id", (req, res) => {
  res.send(`List an user: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Add an new user: ${req.params}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update the user: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete the user: ${req.params.id}`);
});

module.exports = router;
