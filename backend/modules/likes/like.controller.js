const mongoose = require("mongoose");
const Post = require("../post/post.model");

exports.toggleLike = async (req, resp, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new Error(""));
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error(""));
    }

    const post = await Post.findById(id);
    if (!post) {
      return next(new Error(""));
    }

    const existingIndex = post.likes.findIndex(
      (like) => like.userId.toString() === user._id.toString(),
    );

    let message;

    if (existingIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1);
      message = "Post unliked";
    } else {
      post.likes.push({
        userId: user._id,
        username: user.name,
      });
      message = "Post liked";
    }

    await post.save()

    return resp.status(201).json({
      success: true,
      message,
      likeCount : post.likes.length,
    });
  } catch (err) {
    return next(err);
  }
};
