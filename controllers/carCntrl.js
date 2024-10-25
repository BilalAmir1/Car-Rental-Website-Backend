import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//function to create new car data in database
export const createCar = asyncHandler(async (req, res) => {
  const {
    name,
    year,
    color,
    brand,
    transmission,
    costPerHour,
    imgUrl,
    address,
  } = req.body.data;

  const yearAsInt = parseInt(year, 10);
  const costPerHourAsInt = parseInt(costPerHour, 10);

  console.log(req.body.data);
  try {
    const car = await prisma.car.create({
      data: {
        name,
        year: yearAsInt,
        color,
        brand,
        transmission,
        costPerHour: costPerHourAsInt,
        imgUrl,
        address,
      },
    });

    res.send({ message: "Car created successfully", car });
  } catch (err) {
    if (err.code == "P2002") {
      throw new Error("A car aldready there");
    }
    throw new Error(err.message);
  }
});

//function to get all the cars
export const getAllCars = asyncHandler(async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(cars);
  } catch (err) {
    if (err.code == "P2002") {
      throw new Error("Error sending cars");
    }
    throw new Error(err.message);
  }
});

//function to get a specific car
export const getCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const car = await prisma.car.findUnique({ where: { id } });
    res.send(car);
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to delete a car
export const deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const car = await prisma.car.delete({ where: { id } });
    res.status(200).json({ message: "Car deleted Successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
