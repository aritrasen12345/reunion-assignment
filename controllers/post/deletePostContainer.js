import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const deletePostContainer = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      createdBy: userId,
    }).populate("createdBy");

    if (!deletedPost) {
      return res.status(404).json({
        status: false,
        message: "NO POST FOUND!",
        data: [],
      });
    }

    // Delete all Comments of that Post
    await Comment.deleteMany({ _id: { $in: deletedPost.comments } });

    return res.status(200).json({
      status: true,
      message: "POST DELETED SUCCESSFULLY!",
      data: deletedPost,
    });
  } catch (err) {
    next(err);
  }
};

export default deletePostContainer;
