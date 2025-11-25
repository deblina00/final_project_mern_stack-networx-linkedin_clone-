const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendMail } = require("../utils/mailer");
const { OAuth2Client } = require("google-auth-library");
const NotificationModal = require("../models/notification");
const {
  otpTemplate,
  verifySuccessTemplate,
} = require("../utils/emailTemplates");
const Joi = require("joi");
const crypto = require("crypto");

const client = new OAuth2Client();

const registerSchema = Joi.object({
  f_name: Joi.string().min(2).required(),
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
}
function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
}

exports.loginThroghGmail = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "idToken required" });

    // Verify token and get payload
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, given_name, picture } = payload;

    if (!email)
      return res
        .status(400)
        .json({ message: "Google account email is required" });

    let user = await User.findOne({ email });
    if (!user) {
      // generate username from email local part (pattern 3)
      const localPart = email.split("@")[0];
      let base =
        localPart.replace(/[^a-zA-Z0-9_.-]/g, "").toLowerCase() || "user";
      let username = base;
      let suffix = 1;
      while (await User.findOne({ username })) {
        username = `${base}${suffix++}`;
      }
      // Register new user
      user = new User({
        googleId: sub,
        email,
        username,
        f_name: given_name,
        profilePic: picture,
        password: crypto.randomBytes(24).toString("hex"), // random password (not used)
        isVerified: true,
      });
      await user.save();
    }

    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 3600 * 1000,
    });

    // res.cookie("accesstoken", accessToken, {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 15 * 60 * 1000,
    // });

    return res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        f_Name: user.f_name,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("googleLogin error=", err.message);
    res.status(500).json({ message: "Google login failed" });
  }
};

// exports.register = async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { error, value } = registerSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.message });

//     let { email, password, f_name, username } = req.body;
//     let isUserExist = await User.findOne({ $or: [{ email }, { username }] });
//     if (isUserExist) {
//       return res.status(409).json({
//         error:
//           "Already have an account with this email. Please try with other email ID",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     // console.log(hashedPassword);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       f_name,
//       username,
//     });

//     // generate 6-digit OTP, expires in 10 minutes
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     newUser.otp = { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 };
//     await newUser.save();

//     // send OTP email
//     const mail = otpTemplate({ f_name, otp });
//     await sendMail({ to: email, subject: mail.subject, html: mail.html });

//     return res.status(201).json({
//       message:
//         "User registered successfully. OTP sent to email. Please verify.",
//       success: "yes",
//       data: newUser,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    let { email, password, f_name, username } = req.body;

    // Check if user already exists by email or username
    const isUserExist = await User.findOne({ $or: [{ email }, { username }] });
    if (isUserExist) {
      return res.status(409).json({
        error:
          "An account with this email or username already exists. Please try another.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with OTP
    const newUser = new User({
      email,
      password: hashedPassword,
      f_name,
      username,
      otp: {
        code: Math.floor(100000 + Math.random() * 900000).toString(),
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      },
    });

    // Save user, catch duplicate key errors from MongoDB
    try {
      await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          error: "Email or username already exists",
          message: err.message,
        });
      }
      throw err; // rethrow other errors
    }

    // Send OTP email
    const mail = otpTemplate({ f_name, otp: newUser.otp.code });
    await sendMail({ to: email, subject: mail.subject, html: mail.html });

    return res.status(201).json({
      message:
        "User registered successfully. OTP sent to email. Please verify.",
      success: "yes",
      data: newUser,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.otp || user.otp.code !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (user.otp.expiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const mail = verifySuccessTemplate({ f_name: user.f_name });
    await sendMail({ to: user.email, subject: mail.subject, html: mail.html });

    return res.json({
      message: "User Verified successfully. Now you can Login.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    let { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Email not verified. Please verify via OTP sent to your email.",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // Optionally set refresh token in httpOnly cookie:
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false /* set true in prod */,
      maxAge: 7 * 24 * 3600 * 1000,
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    return res.json({
      message: "Logged in successfully, welcome to Networx!",
      success: "true",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token)
      return res.status(401).json({ message: "Refresh token missing" });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const accessToken = generateAccessToken(user);
    return res.json({ accessToken });
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

exports.triggerOtp = async (req, res) => {
  // For resending OTP (e.g., user requests verification code to be resent)
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 };
    await user.save();

    const mail = otpTemplate({ f_name: user.f_name, otp });
    await sendMail({ to: user.email, subject: mail.subject, html: mail.html });

    return res.json({ message: "OTP resent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    const isExist = await User.findById(req.user._id);
    if (!isExist) {
      return res.status(400).json({ error: "User Doesnt exist" });
    }
    const updateData = await User.findByIdAndUpdate(isExist._id, user);
    console.log(updateData);

    const userData = await User.findById(req.user._id);
    res.status(200).json({
      message: "User updated successfully",
      user: userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await User.findById(id);
    if (!isExist) {
      return res.status(400).json({ error: "No Such User Exist" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user: isExist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  res.clearCookie("accesstoken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.json({ message: "Logged out successfully" });
};

exports.findUser = async (req, res) => {
  try {
    let { query } = req.query;
    console.log(query);

    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [
            { name: { $regex: new RegExp(`^${query}`, "i") } },
            { email: { $regex: new RegExp(`^${query}`, "i") } },
          ],
        },
      ],
    });
    return res.status(201).json({
      message: "Fetched Member",
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const sender = req.user._id;
    const { receiver } = req.body;

    const userExist = await User.findById(receiver);
    if (!userExist) {
      return res.status(400).json({
        error: "No such user exist.",
      });
    }
    const index = req.user.friends.findIndex((id) => id.equals(receiver));

    if (index !== -1) {
      return res.status(400).json({ error: "Already Friend" });
    }
    const lastIndex = userExist.pending_friends.findIndex((id) =>
      id.equals(req.user._id)
    );

    if (lastIndex !== -1) {
      return res.status(400).json({ error: "Already Sent Request" });
    }

    userExist.pending_friends.push(sender);
    let content = `${req.user.f_name} has sent you friend request`;
    const notification = new NotificationModal({
      sender,
      receiver,
      content,
      type: "friendRequest",
    });

    await notification.save();
    await userExist.save();

    res.status(200).json({
      message: "Friend Request Sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    let { friendId } = req.body;
    let selfId = req.user._id;
    const friendData = await User.findById(friendId);
    if (!friendData) {
      return res.status(400).json({
        error: "No such user exist",
      });
    }

    const index = req.user.pending_friends.findIndex((id) =>
      id.equals(friendId)
    );

    if (index !== -1) {
      req.user.pending_friends.splice(index, 1);
    } else {
      return res.status(400).json({
        error: "No any request from such user",
      });
    }

    req.user.friends.push(friendId);

    friendData.friends.push(req.user._id);

    let content = `${req.user.f_name} has accepted your friend request`;
    const notification = new NotificationModal({
      sender: req.user._id,
      receiver: friendId,
      content,
      type: "friendRequest",
    });
    await notification.save();
    await friendData.save();
    await req.user.save();

    return res.status(200).json({
      message: "You both are connected now.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getFriendsList = async (req, res) => {
  try {
    // console.log(req.user);
    let friendsList = await req.user.populate("friends");
    return res.status(200).json({
      friends: friendsList.friends,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getPendingFriendList = async (req, res) => {
  try {
    let pendingFriendsList = await req.user.populate("pending_friends");
    return res.status(200).json({
      pendingFriends: pendingFriendsList.pending_friends,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.removeFromFriend = async (req, res) => {
  try {
    let selfId = req.user._id;
    let { friendId } = req.params;

    const friendData = await User.findById(friendId);
    if (!friendData) {
      return res.status(400).json({
        error: "No such user exist.",
      });
    }

    const index = req.user.friends.findIndex((id) => id.equals(friendId));
    const friendIndex = friendData.friends.findIndex((id) => id.equals(selfId));

    if (index !== -1) {
      req.user.friends.splice(index, 1);
    } else {
      return res.status(400).json({
        error: "No request from such user",
      });
    }

    if (friendIndex !== -1) {
      friendData.friends.splice(friendIndex, 1);
    } else {
      return res.status(400).json({
        error: "No request from such user",
      });
    }

    await req.user.save();
    await friendData.save();
    return res.status(200).json({
      message: "You both are disconnected now.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};
