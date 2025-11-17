

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: APIs for creating and fetching chat conversations
 */

const express = require("express");
const router = express.Router();
const Authentication = require("../authentication/auth");
const ConversationController = require("../controller/conversation");

/**
 * @swagger
 * /conversation/add-conversation:
 *   post:
 *     summary: Start a new conversation or send a message in an existing one
 *     tags: [Conversations]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: ID of the user to start a conversation with
 *                 example: 64ac9f21b9a7a001f28e6124
 *               message:
 *                 type: string
 *                 description: The initial message to send
 *                 example: "Hey, how are you doing?"
 *     responses:
 *       201:
 *         description: Message sent and conversation created (if new)
 *       400:
 *         description: Invalid input or missing parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/add-conversation",
  Authentication,
  ConversationController.addConversation
);

/**
 * @swagger
 * /conversation/get-conversation:
 *   get:
 *     summary: Get all conversations for the logged-in user
 *     tags: [Conversations]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Conversations fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fetched Successfully"
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
  "/get-conversation",
  Authentication,
  ConversationController.getConversation
);

module.exports = router;
