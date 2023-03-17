import Post from "../../models/Post.js";

const getPostController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundPost = await Post.findById(id)
      .populate("likes comments")
      .select("title desc likes comments");

    if (!foundPost) {
      return res.status(404).json({
        status: false,
        message: "POST NOT FOUND",
      });
    }

    return res.status(200).json({
      status: true,
      message: "GETTING POST DATA SUCCESSFULLY!",
      data: {
        noOfLikes: foundPost.likes.length,
        noOfComments: foundPost.comments.length,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getPostController;
