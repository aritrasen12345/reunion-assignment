import Post from "../../models/Post.js";

const likePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const foundPost = await Post.find({ _id: postId, likes: userId }).populate(
      "createdBy"
    );

    if (!foundPost) {
      return res.status(404).json({
        status: false,
        message: "NO POST FOUND!",
        data: [],
      });
    }

    if (foundPost.length > 0) {
      return res.status(404).json({
        status: false,
        message: "ALREADY LIKED THE POST!",
        data: [],
      });
    }

    const like = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { likes: userId },
      },
      {
        new: true,
      }
    ).populate("createdBy", "name");

    if (like) {
      return res.status(400).json({
        status: true,
        message: "POST LIKED SUCCESSFULLY!",
        data: like,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default likePostController;
