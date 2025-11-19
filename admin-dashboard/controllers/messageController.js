const Message = require("../models/message");
const Conversation = require("../models/conversation"); // <-- REQUIRED FIX

exports.list = async (req, res) => {
  if (!req.session.admin) return res.redirect("/");

  const { q, page = 1, limit = 10 } = req.query;
  const filter = q ? { message: new RegExp(q, "i") } : {};
  const skip = (page - 1) * limit;

  const total = await Message.countDocuments(filter);

  const messages = await Message.find(filter)
    .populate("sender", "f_name email")
    .populate({
      path: "conversation",
      populate: { path: "members", select: "f_name email" },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.render("messages", {
    messages,
    q: q || "",
    page: parseInt(page),
    total,
    pages: Math.ceil(total / limit),
  });
};

exports.delete = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const message = await Message.findByIdAndDelete(id);
  if (!message) return res.status(404).json({ error: "Message not found" });

  return res.json({ success: true, message: "Message deleted successfully" });
};