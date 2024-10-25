import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
} from "../controllers/blogCntrl.js";
const router = express.Router();

router.post("/create", createBlog);
router.get("/allblogs", getAllBlogs);
router.delete("/:id", deleteBlog);

export { router as blogRoute };
