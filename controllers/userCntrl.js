import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//function to create a user
export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a User");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User Registered Successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User has already registered" });
});

//function to rent a car
export const rentCar = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyRented = await prisma.user.findUnique({
      where: { email: email },
      select: { rentedCars: true },
    });
    if (alreadyRented.rentedCars.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "This car is aldready rented by u" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          rentedCars: { push: { id, date } },
        },
      });
      res.send("Your car is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to get all the rented cars of a user
export const allRentedCars = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { rentedCars: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to cancel a rented car
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { rentedCars: true },
    });

    const index = user.rentedCars.findIndex((visit) => visit.id === id);
    if (index == -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.rentedCars.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          rentedCars: user.rentedCars,
        },
      });
      res.send("Booking Canceled");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to add a car in faviourite list of user
export const addFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user.favCarsID.includes(rid)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favCarsID: {
            set: user.favCarsID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favourite", user: updatedUser });
    } else {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favCarsID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favourite", user: updatedUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function  to show all Favourite cars
export const allFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favCars = await prisma.user.findUnique({
      where: { email },
      select: { favCarsID: true },
    });
    res.status(200).send(favCars);
  } catch (err) {
    throw new Error(err.message);
  }
});
