/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management & authentication APIs
 */

const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const Authentication = require("../authentication/auth");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - f_name
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *               f_name:
 *                 type: string
 *                 example: John
 *               username:
 *                 type: string
 *                 example: john001
 *     responses:
 *       201:
 *         description: User registered successfully. OTP sent.
 *       400:
 *         description: Validation error
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP after registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
router.post("/verify-otp", UserController.verifyOtp);

/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP if user did not receive it
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP resent successfully
 */
router.post("/resend-otp", UserController.triggerOtp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login using email/username and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrUsername
 *               - password
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *       403:
 *         description: Email not verified
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Login/Register using Google OAuth
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: eyJhbGciOiJSUzI1NiIsInR...
 *     responses:
 *       200:
 *         description: Google login successful
 */
router.post("/google", UserController.loginThroghGmail);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Get a new access token using refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token returned
 *       401:
 *         description: Invalid refresh token
 */
router.post("/refresh", UserController.refreshToken);

/**
 * @swagger
 * /auth/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 example:
 *                   f_name: "John Doe"
 *                   headline: "Software Developer"
 *                   curr_company: "OpenAI"
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/update", Authentication, UserController.updateUser);

/**
 * @swagger
 * /auth/user/{id}:
 *   get:
 *     summary: Get a user's public profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 */
router.get("/user/:id", UserController.getProfileById);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user by clearing refresh token cookie
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post("/logout", Authentication, UserController.logout);

/**
 * @swagger
 * /auth/self:
 *   get:
 *     summary: Get logged-in user details
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current logged-in user returned
 */
router.get("/self", Authentication, (req, res) => {
  return res.status(200).json({ user: req.user });
});

/**
 * @swagger
 * /auth/findUser:
 *   get:
 *     summary: Search for users by email or name
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: john
 *     responses:
 *       200:
 *         description: Matching users returned
 */
router.get("/findUser", Authentication, UserController.findUser);

/**
 * @swagger
 * /auth/sendFriendReq:
 *   post:
 *     summary: Send a friend request to another user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver
 *             properties:
 *               receiver:
 *                 type: string
 *                 example: 64ac5c1f1b9a7a001f28e612
 *     responses:
 *       200:
 *         description: Friend request sent
 */
router.post("/sendFriendReq", Authentication, UserController.sendFriendRequest);

/**
 * @swagger
 * /auth/acceptFriendRequest:
 *   post:
 *     summary: Accept a pending friend request
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendId
 *             properties:
 *               friendId:
 *                 type: string
 *                 example: 64ac5c1f1b9a7a001f28e612
 *     responses:
 *       200:
 *         description: Friend request accepted
 */
router.post(
  "/acceptFriendRequest",
  Authentication,
  UserController.acceptFriendRequest
);

/**
 * @swagger
 * /auth/removeFromFriendList/{friendId}:
 *   delete:
 *     summary: Remove a friend
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend removed
 */
router.delete(
  "/removeFromFriendList/:friendId",
  Authentication,
  UserController.removeFromFriend
);

/**
 * @swagger
 * /auth/friendsList:
 *   get:
 *     summary: Get list of all friends
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Friends list returned
 */
router.get("/friendsList", Authentication, UserController.getFriendsList);

/**
 * @swagger
 * /auth/pendingFriendsList:
 *   get:
 *     summary: Get list of pending friend requests
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Pending friend requests returned
 */
router.get(
  "/pendingFriendsList",
  Authentication,
  UserController.getPendingFriendList
);

module.exports = router;
