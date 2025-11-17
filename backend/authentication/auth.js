
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function auth(req, res, next) {
  try {
    // const token = req.cookies?.token;
    let token = req.cookies?.token; // <-- FIXED (let)

    // allow Authorization header too
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // your JWT uses "id", not "userId"
    const user = await User.findById(decode.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = auth;
