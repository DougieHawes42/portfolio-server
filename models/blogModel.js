const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
