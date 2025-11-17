const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.comment || mongoose.model("comment", CommentSchema);
