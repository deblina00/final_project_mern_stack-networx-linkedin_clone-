const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/message-user/:id", async (req, res) => {
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
});

module.exports = router;
