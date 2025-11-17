// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessions for admin login
app.use(
  session({
    secret: process.env.SESSION_SECRET || "adminSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/", adminRoutes);

const PORT = process.env.ADMIN_PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Admin Dashboard running on http://localhost:${PORT}`);
});
