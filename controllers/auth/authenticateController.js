import User from "../../models/User.js";
import config from "../../config/config.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const authenticateController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).select(
      "_id name email password"
    );

    // If Not found then send "No User Found"
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "USER NOT FOUND!",
        data: [],
      });
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    // If password doesn't match send Invalid Password
    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "INVALID PASSWORD!",
        data: [],
      });
    }

    const token = JWT.sign(
      {
        id: foundUser._id,
      },
      config.JWT_ACTIVATE,
      {
        expiresIn: "7d",
      }
    );

    // If everything works fine then return Authentication Successful
    return res.status(200).json({
      status: true,
      message: "AUTHENTICATION SUCCESSFUL!",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default authenticateController;
