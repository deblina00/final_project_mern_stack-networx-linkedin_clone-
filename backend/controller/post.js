const PostModel = require("../models/post");

exports.addPost = async (req, res) => {
  try {
    const { desc, imageLink, videoLink, article } = req.body;
    const userId = req.user._id;

    const newPost = new PostModel({
      user: userId,
      desc,
      imageLink,
      imageLink,
      videoLink,
      article,
    });

    await newPost.save();

    return res.status(200).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.likeDislikePost = async (req, res) => {
  try {
    const selfId = req.user._id;
    const { postId } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "No such post found" });
    }

    const index = post.likes.findIndex((id) => id.equals(selfId));

    if (index !== -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(selfId);
    }

    await post.save();

    res.status(200).json({
      message: index !== -1 ? "Post unliked" : "Post liked",
      likes: post.likes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find({ isBlocked: false })
      .sort({ createdAt: -1 })
      .populate("user", "-password");

    res.status(200).json({
      message: "Fetched Data",
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getPostByPostId = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate(
      "user",
      "-password"
    );
    if (!post) {
      return res.status(400).json({ error: "No such post found" });
    }
    return res.status(200).json({
      message: "Fetched Data",
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getTop5PostForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalPosts = await PostModel.countDocuments({ user: userId });

    const posts = await PostModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .limit(5);

    return res.status(200).json({
      message: "Fetched Data",
      posts,
      totalPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

exports.getAllPostForUser = async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("user", "-password");

    return res.status(200).json({
      message: "Fetched Data",
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
};
