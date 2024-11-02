import userModel from "../models/userModel.js";

export const updateUsercontroller = async (req, res, next) => {
  const { name, lastName, location } = req.body;

  if (!name || !lastName || !location) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Find user by ID and update their details
    const user = await userModel.findOne({ _id: req.user.userId });

    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
