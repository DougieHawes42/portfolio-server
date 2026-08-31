const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    gitHubClientLink: {
      type: String,
      required: true,
      trim: true,
    },
    gitHubServerLink: {
      type: String,
      trim: true,
    },
    siteLink: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Work", workSchema);
