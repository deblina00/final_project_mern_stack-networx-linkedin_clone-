

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: APIs for sending and retrieving chat messages
 */

const express = require("express");
const router = express.Router();
const Authentication = require("../authentication/auth");
const MessageController = require("../controller/message");

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversation:
 *                 type: string
 *                 description: Conversation ID
 *                 example: 64ac9f21b9a7a001f28e6124
 *               message:
 *                 type: string
 *                 description: The message text
 *                 example: "Hey, how are you doing?"
 *               picture:
 *                 type: string
 *                 description: Optional image URL for the message
 *                 example: "https://example.com/image.png"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", Authentication, MessageController.sendMessage);

/**
 * @swagger
 * /message/{convId}:
 *   get:
 *     summary: Get all messages for a conversation
 *     tags: [Messages]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: convId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64ac9f21b9a7a001f28e6124
 *         description: ID of the conversation to fetch messages from
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: string
 *                   example: "Fetched Message Successfully"
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sender:
 *                         type: object
 *                       message:
 *                         type: string
 *                       picture:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:convId", Authentication, MessageController.getMessage);

module.exports = router;
