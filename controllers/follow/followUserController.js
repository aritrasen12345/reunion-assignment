import User from "../../models/User.js";

const followUserController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.params.id;
    const foundUser = await User.find({
      _id: id,
      followers: userId,
    });

    // If Not found then send "No User Found"
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "USER NOT FOUND!",
        data: [],
      });
    }

    // If already following this user
    if (foundUser.length > 0) {
      return res.status(200).json({
        status: true,
        message: "YOU ARE ALREADY FOLLOWING THIS USER!",
        data: [],
      });
    }

    // Update Followed User
    const newUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          followers: userId,
        },
      },
      { new: true }
    ).populate("followers following", "-password");

    // Update Follower User
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { following: id } },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "FOLLOWING SUCCESSFULLY!",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export default followUserController;
