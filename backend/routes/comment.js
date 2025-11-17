
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: APIs for creating and retrieving post comments
 */

const express = require("express");
const router = express.Router();
const Authentication = require("../authentication/auth");
const CommentControllers = require("../controller/comment");

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: ID of the post being commented on
 *                 example: 64ac9f21b9a7a001f28e6124
 *               comment:
 *                 type: string
 *                 description: The comment text
 *                 example: "Awesome post! Keep it up 👏"
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Commented Successfully"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         f_name:
 *                           type: string
 *                           example: "John"
 *                         headline:
 *                           type: string
 *                           example: "Software Developer"
 *                         profilePic:
 *                           type: string
 *                           example: "https://example.com/profile.jpg"
 *                     comment:
 *                       type: string
 *                       example: "Awesome post! Keep it up 👏"
 *       400:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", Authentication, CommentControllers.commentPost);

/**
 * @swagger
 * /comment/{postId}:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64ac9f21b9a7a001f28e6124
 *         description: The ID of the post whose comments should be fetched
 *     responses:
 *       201:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments fetched"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           f_name:
 *                             type: string
 *                             example: "Jane"
 *                           headline:
 *                             type: string
 *                             example: "UI/UX Designer"
 *                           profilePic:
 *                             type: string
 *                             example: "https://example.com/jane.jpg"
 *                       comment:
 *                         type: string
 *                         example: "Great work!"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:postId", CommentControllers.getCommentByPostId);

module.exports = router;
