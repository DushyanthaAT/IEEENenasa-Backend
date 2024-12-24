import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    requied: true,
    trim: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  decription: {
    type: String,
    requied: true,
    trim: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.modelNames("Post", postSchema);

export default Post;
