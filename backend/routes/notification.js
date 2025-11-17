
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: APIs for handling user notifications
 */

const express = require("express");
const router = express.Router();
const Authentication = require("../authentication/auth");
const NotificationController = require("../controller/notification");

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", Authentication, NotificationController.getNotification);

/**
 * @swagger
 * /notification/isRead:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationId:
 *                 type: string
 *                 example: 64ac6d2e3b1aab0023c7b9e1
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.put("/isRead", Authentication, NotificationController.updateRead);

/**
 * @swagger
 * /notification/activeNotification:
 *   get:
 *     summary: Get count of unread notifications
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Unread notifications count fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications Number Fetched Successfully"
 *                 count:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
  "/activeNotification",
  Authentication,
  NotificationController.activeNotify
);

module.exports = router;
