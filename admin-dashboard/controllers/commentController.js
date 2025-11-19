// controllers/commentController.js
const Comment = require("../models/comment");
const sendEmail = require("../utils/sendEmail");

exports.list = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");
  const { q, page = 1, limit = 10 } = req.query;
  const filter = q ? { comment: new RegExp(q, "i") } : {};
  const skip = (page - 1) * limit;
  const total = await Comment.countDocuments(filter);
  const comments = await Comment.find(filter)
    .populate("user", "f_name")
    .populate("post")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  res.render("comments", {
    comments,
    q: q || "",
    page: parseInt(page),
    total,
    pages: Math.ceil(total / limit),
  });
};


exports.remove = async (req, res) => {
  try {
    if (!req.session.admin)
      return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const reason = req.query.reason || req.body.reason || "No reason provided";

    const comment = await Comment.findByIdAndDelete(id).populate("user");
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Send email only if user exists
    if (comment.user && comment.user.email) {
      try {
        await sendEmail(
          comment.user.email,
          "comment_removed",
          {
            fullName: comment.user.f_name || "User",
            commentText: comment.comment,
            reason,
          },
          "Your Comment Has Been Removed"
        );
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Comment deletion error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
