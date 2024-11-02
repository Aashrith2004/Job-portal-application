import { model } from "mongoose";
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) next("Name is required");
  if (!email) next("Email is required");
  if (!password || password.length < 6)
    next("Password is required and more than 6 characters");
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already exists,pls log in");
  }
  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide all fields");
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) next("Invalid username or password");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) next("Invalid username or password");
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
    token,
  });
};
