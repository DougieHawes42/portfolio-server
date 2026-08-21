const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("work route");
});
router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.send(`work route ${id}`);
});

module.exports = router;
