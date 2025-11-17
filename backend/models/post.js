const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    desc: {
      type: String,
    },
    imageLink: {
      type: String,
    },
    videoLink: {
      type: String,
    },
    article: {
      type: String,
    },
    isBlocked: {
      // ⬅️ ADD THIS new
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
