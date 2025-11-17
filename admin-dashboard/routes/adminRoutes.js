// admin-dashboard/routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const messageController = require("../controllers/messageController");
const notificationController = require("../controllers/notificationController");

// ======================= AUTH =======================
router.get("/", adminController.getLogin);
router.post("/login", adminController.postLogin);
router.get("/logout", adminController.logout);

// ======================= DASHBOARD =======================
router.get("/dashboard", adminController.getDashboard);

// ======================= USERS =======================
router.get("/users", userController.list);
router.delete("/users/:id", userController.delete);
router.put("/users/block/:id", userController.block);
router.put("/users/unblock/:id", userController.unblock);

// ======================= POSTS =======================
router.get("/posts", postController.list);
router.delete("/posts/:id", postController.delete);
router.put("/posts/block/:id", postController.block);
router.put("/posts/unblock/:id", postController.unblock);

// ======================= COMMENTS =======================
router.get("/comments", commentController.list);
// router.delete("/comments/:id", commentController.delete);
router.delete("/comments/remove/:id", commentController.remove);

// ======================= MESSAGES =======================
router.get("/messages", messageController.list);
router.delete("/messages/:id", messageController.delete);

// Send general admin message to user
router.post("/message-user/:id", adminController.sendUserMessage);

// ======================= NOTIFICATIONS =======================
router.get("/notifications", notificationController.list);
router.put("/notifications/read/:id", notificationController.markRead);
router.delete("/notifications/:id", notificationController.delete);

module.exports = router;
