const mongoose = require("mongoose");
const postData = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    filename: {
      type: String,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        username: {
          type: String,
        },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        username: {
          type: String,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Posts", postData, "Posts");
