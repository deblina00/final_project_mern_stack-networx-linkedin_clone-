/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: APIs for creating, fetching, and interacting with posts
 */

const express = require("express");
const router = express.Router();

const Authentication = require("../authentication/auth");
const PostController = require("../controller/post");

const { validate } = require("../middleware/validate");

const {
  addPostSchema,
  likeDislikeSchema,
  getPostByIdSchema,
  getUserIdSchema,
} = require("../validators/postValidator");

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *                 example: "Excited to share my new project!"
 *               imageLink:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               videoLink:
 *                 type: string
 *                 example: "https://example.com/video.mp4"
 *                 article:
 *                 type: string
 *                 example: "https://example.com/article.pdf"
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  Authentication,
  validate(addPostSchema),
  PostController.addPost
);

/**
 * @swagger
 * /post/likeDislike:
 *   post:
 *     summary: Like or unlike a post
 *     tags: [Posts]
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
 *                 example: "64ac5c1f1b9a7a001f28e612"
 *     responses:
 *       200:
 *         description: Post liked or unliked
 *       400:
 *         description: Invalid postId or no such post exists
 */
router.post(
  "/likeDislike",
  Authentication,
  validate(likeDislikeSchema),
  PostController.likeDislikePost
);

/**
 * @swagger
 * /post/getAllPost:
 *   get:
 *     summary: Fetch all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get("/getAllPost", PostController.getAllPost);

/**
 * @swagger
 * /post/getPostById/{postId}:
 *   get:
 *     summary: Get a post by its ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ac5c1f1b9a7a001f28e612"
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *       400:
 *         description: Invalid postId or post not found
 */
router.get(
  "/getPostById/:postId",
  validate(getPostByIdSchema, "params"),
  PostController.getPostByPostId
);

/**
 * @swagger
 * /post/getTop5Post/{userId}:
 *   get:
 *     summary: Get top 5 recent posts for a user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ac5c1f1b9a7a001f28e612"
 *     responses:
 *       200:
 *         description: Top 5 posts fetched successfully
 *       400:
 *         description: Invalid userId
 */
router.get(
  "/getTop5Post/:userId",
  validate(getUserIdSchema, "params"),
  PostController.getTop5PostForUser
);

/**
 * @swagger
 * /post/getAllPostForUser/{userId}:
 *   get:
 *     summary: Get all posts for a specific user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64ac5c1f1b9a7a001f28e612"
 *     responses:
 *       200:
 *         description: All posts fetched successfully
 *       400:
 *         description: Invalid userId
 */
router.get(
  "/getAllPostForUser/:userId",
  validate(getUserIdSchema, "params"),
  PostController.getAllPostForUser
);

module.exports = router;
