import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const addCommentController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const { comment } = req.body;
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      return res.status(404).json({
        status: false,
        message: "NO POST FOUND!",
        data: [],
      });
    }
    const newComment = new Comment({
      comment,
      createdBy: userId,
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment._id } },
      { new: true }
    );

    await newComment.save();

    return res.status(200).json({
      status: true,
      message: "NEW COMMENT CREATED SUCCESSFULLY!",
      data: {
        commentId: newComment._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addCommentController;
