import express from "express";
import {
  checkBookings,
  createBooking,
  getAllBookings,
  getBookedTimeSlots,
} from "../controllers/bookingCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", createBooking);
router.get("/check", checkBookings);
router.get("/booked-time-slots", getBookedTimeSlots);
router.get("/getBookings", getAllBookings);

export { router as bookingRoute };
