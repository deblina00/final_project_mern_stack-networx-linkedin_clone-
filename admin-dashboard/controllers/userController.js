// controllers/userController.js
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

exports.list = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");
  const { q, page = 1, limit = 10 } = req.query;
  const filter = q
    ? { $or: [{ f_name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }] }
    : {};
  const skip = (page - 1) * limit;
  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  res.render("users", {
    users,
    q: q || "",
    page: parseInt(page),
    total,
    pages: Math.ceil(total / limit),
  });
};

// userController.js
exports.delete = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  return res.json({ success: true, message: "User deleted successfully" });
};



// BLOCK USER
exports.block = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const { reason } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: "User not found" });

  // Send email
  await sendEmail(
    user.email,
    "account_blocked",
    { fullName: user.f_name, reason },
    "Your Networx Account Has Been Temporarily Restricted"
  );

  return res.json({ success: true });
};

// UNBLOCK USER
exports.unblock = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: "User not found" });

  // Send email
  await sendEmail(
    user.email,
    "account_unblocked",
    { fullName: user.f_name },
    "Your Networx Account Has Been Restored"
  );

  return res.json({ success: true });
};
