// controllers/notificationController.js
const Notification = require("../models/notification");

exports.list = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");

  const { q, page = 1, limit = 10 } = req.query;
  const filter = q ? { notification: new RegExp(q, "i") } : {};
  const skip = (page - 1) * limit;

  const total = await Notification.countDocuments(filter);

  const notifications = await Notification.find()
    .populate("sender receiver", "f_name email")
    .sort({ createdAt: -1 })
    .limit(200);
  res.render("notifications", {
    notifications,
    q: q || "",
    page: parseInt(page),
    total,
    pages: Math.ceil(total / limit),
  });
};

exports.markRead = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { isRead: true });
  return res.json({ success: true });
};

// notificationController.js
exports.delete = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const notification = await Notification.findByIdAndDelete(id);
  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  return res.json({
    success: true,
    message: "Notification deleted successfully",
  });
};
