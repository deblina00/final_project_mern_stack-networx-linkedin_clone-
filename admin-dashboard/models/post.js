const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    desc: { type: String },
    imageLink: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    isBlocked: { type: Boolean, default: false },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.post || mongoose.model("post", PostSchema);
