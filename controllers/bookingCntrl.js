import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createBooking = asyncHandler(async (req, res) => {
  const {
    carId,
    userEmail,
    startDate,
    endDate,
    address,
    phoneNumber,
    totalHours,
    totalAmount,
    transactionId,
  } = req.body.data;

  try {
    const booking = await prisma.booking.create({
      data: {
        carId,
        userEmail,
        startDate,
        endDate,
        address,
        phoneNumber,
        totalHours,
        totalAmount,
        transactionId,
      },
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    if (err.code === "P2002") {
      // Booking already exists
      return res.status(409).json({ error: "Booking already exists" });
    }

    // Log the actual error for debugging purposes
    console.error(err);

    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
});

//function to check bookings
export const checkBookings = asyncHandler(async (req, res) => {
  try {
    const { carId, userEmail, startDate, endDate } = req.query;

    console.log(
      "Checking bookings for carId:",
      carId,
      "userEmail:",
      userEmail,
      "startDate:",
      startDate,
      "endDate:",
      endDate
    );

    // Assuming your Prisma model has unique constraints
    const existingBooking = await prisma.booking.findUnique({
      where: {
        carId_userEmail_startDate_endDate: {
          carId: carId,
          userEmail: userEmail,
          startDate: startDate,
          endDate: endDate,
        },
      },
    });

    console.log("Existing Booking:", existingBooking);

    res.json({ exists: !!existingBooking });
  } catch (err) {
    console.error("Error checking bookings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to get booked time slots
export const getBookedTimeSlots = asyncHandler(async (req, res) => {
  try {
    const { carId, userEmail } = req.query;

    console.log(
      "Fetching booked time slots for carId:",
      carId,
      "userEmail:",
      userEmail
    );

    // Replace with your actual Prisma model and field names
    const bookedTimeSlots = await prisma.booking.findMany({
      where: {
        carId: carId,
        userEmail: userEmail,
        // Add any additional conditions based on your model
      },
      // Adjust the select statement based on your model
      select: {
        id: true,
        startDate: true,
        endDate: true,
      },
    });

    console.log("Booked Time Slots:", bookedTimeSlots);

    res.json(bookedTimeSlots);
  } catch (err) {
    console.error("Error fetching booked time slots:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//function to get all bookings-
export const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
