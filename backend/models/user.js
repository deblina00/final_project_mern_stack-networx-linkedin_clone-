const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    otp: {
      code: String,
      expiresAt: Date,
    },
    f_name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      trim: true, //new add
      unique: true,
      lowercase: true,
    },
    headline: {
      type: String,
      default: "",
    },
    curr_company: {
      type: String,
      default: "",
    },
    curr_location: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    },
    cover_pic: {
      type: String,
      default: "https://pbs.twimg.com/media/Ek0QSuNWAAICxpX.png",
    },
    about: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: [
      {
        designation: {
          type: String,
        },
        company_name: {
          type: String,
        },
        duration: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    pending_friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;
