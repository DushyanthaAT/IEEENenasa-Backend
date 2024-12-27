import Admin from "../models/auth.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

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

    const token = createToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
