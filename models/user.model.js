import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requied: true,
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
});

const User = mongoose.Model("User", serSchema);

export default User;
