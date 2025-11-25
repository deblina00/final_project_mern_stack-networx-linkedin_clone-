const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    f_name: { type: String, default: "" },
    headline: { type: String, default: "" },
    curr_company: { type: String, default: "" },
    curr_location: { type: String, default: "" },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    cover_pic: {
      type: String,
      default:
        "https://thingscareerrelated.com/wp-content/uploads/2021/10/default-background-image.png",
    },
    about: { type: String, default: "" },
    skills: { type: [String], default: [] },
    experience: [
      {
        designation: { type: String },
        company_name: { type: String },
        duration: { type: String },
        location: { type: String },
      },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    pending_friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    resume: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.user || mongoose.model("user", UserSchema);
