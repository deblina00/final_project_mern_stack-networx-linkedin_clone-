// controllers/postController.js
const Post = require("../models/post");
const sendEmail = require("../utils/sendEmail");

exports.list = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");

  const { q, page = 1, limit = 10 } = req.query;
  const filter = q ? { desc: new RegExp(q, "i") } : {};
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments(filter);
  
  const posts = await Post.find(filter)
    .populate("user", "f_name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  res.render("posts", {
    posts,
    q: q || "",
    page: parseInt(page),
    total,
    pages: Math.ceil(total / limit),
  });
};

// postController.js
exports.delete = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  return res.json({ success: true, message: "Post deleted successfully" });
};

// BLOCK POST
exports.block = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const { reason } = req.body;

  const post = await Post.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  ).populate("user");
  if (!post) return res.status(404).json({ error: "Post not found" });

  // Send email
  await sendEmail(
    post.user.email,
    "post_blocked",
    { fullName: post.user.f_name, reason },
    "Your Networx Post Has Been Removed"
  );

  return res.json({ success: true });
};

// UNBLOCK POST
exports.unblock = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  ).populate("user");

  if (!post) return res.status(404).json({ error: "Post not found" });

  // Send email
  await sendEmail(
    post.user.email,
    "post_unblocked", // <-- your EJS file name
    { fullName: post.user.f_name },
    "Your Networx Post Has Been Restored"
  );

  return res.json({ success: true, message: "Post unblocked successfully" });
};
