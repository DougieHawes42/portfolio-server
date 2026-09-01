const express = require("express");

const upload = require("../middleware/upload");

const {
  createBlog,
  getBlog,
  getBlogItem,
} = require("../controllers/blogControllers");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create", protect, upload.array("images", 10), createBlog);
router.get("/", getBlog);
router.get("/:id", getBlogItem);

module.exports = router;
