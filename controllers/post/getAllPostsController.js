import Post from "../../models/Post.js";

const getAllPostsController = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(
      "🚀 ~ file: getAllPostsController.js:6 ~ getAllPostsController ~ userId:",
      userId
    );
    const foundPost = await Post.find({
      createdBy: userId,
    })
      .sort("-createdAt")
      .populate("likes comments createdBy")
      .select("-updatedAt -__v");

    if (!foundPost) {
      return res.status(404).json({
        status: false,
        message: "NO POSTS FOUND!",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "FETCH ALL POSTS SUCCESSFULLY!",
      data: [...foundPost],
    });
  } catch (err) {
    next(err);
  }
};

export default getAllPostsController;
