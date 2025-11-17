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

// // commentController.js
// exports.delete = async (req, res) => {
//   if (!req.session.admin)
//     return res.status(401).json({ error: "Unauthorized" });

//   const { id } = req.params;
//   const comment = await Comment.findByIdAndDelete(id);
//   if (!comment) return res.status(404).json({ error: "Comment not found" });

//   return res.json({ success: true, message: "Comment deleted successfully" });
// };



exports.remove = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const { reason } = req.body;

  const comment = await Comment.findByIdAndDelete(id).populate("user");
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  // Send email
  await sendEmail(
    comment.user.email,
    "comment_removed",
    { fullName: comment.user.f_name, commentText: comment.comment, reason },
    "Your Comment Has Been Removed"
  );

  return res.json({ success: true });
};
