import { model } from "mongoose";
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Validate input fields
    if (!name) return next("Name is required");
    if (!email) return next("Email is required");
    if (!password || password.length < 6) 
      return next("Password is required and must be more than 6 characters");

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next("Email already exists, please log in");
    }

    // Create a new user
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
  } catch (error) {
    next(error); // Pass any other errors to the error handler
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return next("Please provide all fields");
    }

    // Find the user
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return next("Invalid email or password");

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next("Invalid email or password");

    // Hide password from response
    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    next(error); // Pass any other errors to the error handler
  }
};
