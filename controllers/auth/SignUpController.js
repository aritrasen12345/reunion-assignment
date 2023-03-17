import bcrypt from "bcrypt";

import User from "../../models/User.js";

const signUpController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Checking whether an user with same email already exists or not
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        status: false,
        message: "User with same email already exists!",
        data: {},
      });
    }
    // If this email is not registered already
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "SUCCESSFULLY SIGNED UP!",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export default signUpController;
