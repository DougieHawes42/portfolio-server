const express = require("express");

const upload = require("../middleware/upload");

const { createWork, getWork } = require("../controllers/workControllers");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create", protect, upload.array("images", 10), createWork);
router.get("/", getWork);

module.exports = router;
