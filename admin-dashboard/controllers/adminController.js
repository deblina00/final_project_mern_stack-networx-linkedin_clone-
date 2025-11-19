const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Message = require("../models/message");
const sendEmail = require("../utils/sendEmail");
const Notification = require("../models/notification");

exports.getLogin = (req, res) => {
  if (req.session.admin) return res.redirect("/dashboard");
  res.render("login", { error: null });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    req.session.admin = { email };
    return res.redirect("/dashboard");
  }

  res.render("login", { error: "Invalid credentials" });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};

exports.getDashboard = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");

  // For now using dummy % change
  // Later you can calculate real growth using data from last week or yesterday
  const stats = {
    users: await User.countDocuments(),
    posts: await Post.countDocuments(),
    comments: await Comment.countDocuments(),
    messages: await Message.countDocuments(),
    notifications: await Notification.countDocuments(),

    usersChange: 5,
    postsChange: -3,
    commentsChange: 12,
    messagesChange: 7,
    notificationsChange: 10,
  };

  res.render("dashboard", { admin: req.session.admin, stats });
};

// Send general admin message to user
exports.sendUserMessage = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const { message } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await sendEmail(
    user.email,
    "general_admin_message",
    { fullName: user.f_name, message },
    "Message From Networx Support"
  );

  return res.json({ success: true });
};
