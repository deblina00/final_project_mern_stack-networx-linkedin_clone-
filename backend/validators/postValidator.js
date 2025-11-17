const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

exports.addPostSchema = Joi.object({
  desc: Joi.string().max(1000).allow(null, ""),
  imageLink: Joi.string().uri().allow(null, "").messages({
    "string.uri": "imageLink must be a valid URL",
  }),
  videoLink: Joi.string().uri().allow(null, ""),
  article: Joi.string().allow(null, ""),
});

exports.likeDislikeSchema = Joi.object({
  postId: Joi.string().custom(objectId).required(),
});

exports.getPostByIdSchema = Joi.object({
  postId: Joi.string().custom(objectId).required(),
});

exports.getUserIdSchema = Joi.object({
  userId: Joi.string().custom(objectId).required(),
});
