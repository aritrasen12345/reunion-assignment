import Post from "../../models/Post.js";

const addPostController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    const newPost = new Post({
      title,
      desc: description,
      createdBy: userId,
    });
    await (await newPost.save()).populate("createdBy", "name email");

    return res.status(200).json({
      status: true,
      message: "NEW POST CREATED SUCCESSFULLY!",
      data: {
        postId: newPost._id,
        title,
        description,
        createdAt: newPost.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addPostController;
