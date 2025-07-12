import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogBySlug,
  getBlogComments,
  getLatestBlogs,
  getRecentBlogs,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// Create blog
blogRouter.post("/add", upload.single("image"), auth, addBlog);

// Get all published blogs
blogRouter.get("/all", getAllBlogs);

// Get latest published blogs
blogRouter.get("/latest", getLatestBlogs);

blogRouter.get("/recent", getRecentBlogs);

// Get comments for a blog (GET method)
blogRouter.get("/comments/:slug", getBlogComments);

// Add comment
blogRouter.post("/add-comment", addComment);

// Get single blog by slug
blogRouter.get("/:slug", getBlogBySlug);

// Delete blog by ID
blogRouter.delete("/delete/:id", auth, deleteBlogById);

// Toggle publish status
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
