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
      default:
        "https://static-cse.canva.com/blob/2196698/1600w-HBwnRqn0b34.jpg",
    },
    cover_pic: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg?semt=ais_hybrid&w=740&q=80",
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
