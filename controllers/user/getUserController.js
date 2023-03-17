import User from "../../models/User.js";

const getUserController = async (req, res, next) => {
  try {
    const id = req.userId;
    const foundUser = await User.findById(id).select(
      "name followers following"
    );

    // If Not found then send "No User Found"
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "USER NOT FOUND!",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "GET USER SUCCESSFULLY!",
      data: {
        name: foundUser.name,
        noOfFollowers: foundUser.followers.length,
        following: foundUser.following.length,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getUserController;
