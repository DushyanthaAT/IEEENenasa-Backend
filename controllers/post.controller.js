import Post from "../models/post.model.js";

import supabase from "../config/supabaseClient.js";

const uploadToSupabase = async (file) => {
  const filePath = `events/${Date.now()}-${file.originalname}`;
  const { data, error } = await supabase.storage
    .from("events-bucket")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });
  if (error) throw new Error(error.message);
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/events-bucket/${filePath}`;
};

export const create = async (req, res, next) => {
  try {
    // const imageUrls = await Promise.all(
    //   req.files.map((file) => uploadToSupabase(file))
    // );

    const newPost = new Post({
      ...req.body,
      // images: imageUrls,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
    });
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          date: req.body.date,
          time: req.body.time,
          location: req.body.location,
          description: req.body.description,
          images: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
    console.error("Error updating post:", error);
  }
};