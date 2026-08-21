const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("skill route");
});

module.exports = router;
