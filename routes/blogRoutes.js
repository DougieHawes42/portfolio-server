const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("blog route");
});
router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.send(`blog route ${id}`);
});

module.exports = router;
