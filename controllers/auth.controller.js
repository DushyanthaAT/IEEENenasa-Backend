import Admin from "../models/auth.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email == "" || password == "") {
    next(errorHandler(400, "All fields are required!!!"));
  }
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (user.password !== password) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ token });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signned out");
  } catch (error) {
    next(error);
  }
};
