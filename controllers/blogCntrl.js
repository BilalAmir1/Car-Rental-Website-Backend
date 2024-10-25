import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//function to create new car data in database
export const createBlog = asyncHandler(async (req, res) => {
  const { title, author, imgUrl, description, quote } = req.body.data;

  console.log(req.body.data);
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        author,
        imgUrl,
        description,
        quote,
      },
    });

    res.send({ message: "Blog created successfully", blog });
  } catch (err) {
    if (err.code == "P2002") {
      throw new Error("A car aldready there");
    }
    throw new Error(err.message);
  }
});

//function to get all the blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(blogs);
  } catch (err) {
    if (err.code == "P2002") {
      throw new Error("Error sending blogs");
    }
    throw new Error(err.message);
  }
});

//function to delete blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.delete({ where: { id } });
    res.status(200).json({ message: "Blog deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
