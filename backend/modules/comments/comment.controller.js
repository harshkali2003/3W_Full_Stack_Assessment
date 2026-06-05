const mongoose = require("mongoose");
const Post = require("../post/post.model");

const AppError = require("../../common/errors/global.error")

exports.createComment = async (req, resp, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new AppError("login first" , 401));
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID" , 400));
    }

    const { comment } = req.body;
    if (!comment || !comment?.trim()) {
      return next(new AppError("comment can't be empty" , 400));
    }

    const post = await Post.findById(id);
    if (!post) {
      return next(new AppError("No Post found" , 404));
    }

    const newComment = {
      userId: user._id,
      username: user.name,
      comment,
      createdAt: new Date(),
    };

    post.comments.push(newComment);

    await post.save();

    return resp.status(201).json({
      success: true,
      message: "comment created successfully",
      data: newComment,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getCommentByPost = async (req, resp, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID" , 400));
    }

    const post = await Post.findById(id);
    if (!post) {
      return next(new AppError("No Post found" , 404));
    }

    return resp.status(200).json({
      success: true,
      message: `comment for postId: ${id} fetched successfully`,
      commentCount: post.comments.length,
      data: post.comments,
    });
  } catch (err) {
    return next(err);
  }
};
