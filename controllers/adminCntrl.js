import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//function to create a admin
export const createAdmin = asyncHandler(async (req, res) => {
  console.log("Creating a Admin");

  let { email } = req.body;
  const adminExists = await prisma.admin.findUnique({
    where: { email: email },
  });
  if (!adminExists) {
    const admin = await prisma.admin.create({ data: req.body });
    res.send({
      message: "Admin Registered Successfully",
      admin: admin,
    });
  } else res.status(201).send({ message: "Admin has already registered" });
});
