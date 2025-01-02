import express from "express";
import {
  create,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:id", deletePost);
router.put("/updatepost/:id", updatePost);

export default router;
