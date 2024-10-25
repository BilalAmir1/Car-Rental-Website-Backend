import express from "express";
import {
  addFavourite,
  allFavourite,
  allRentedCars,
  cancelBooking,
  createUser,
  rentCar,
} from "../controllers/userCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/rentCar/:id", rentCar);
router.post("/allRentedCars", allRentedCars);
router.post("/cancelBooking/:id", cancelBooking);
router.post("/addFavourite/:rid", addFavourite);
router.post("/allFavourite/", allFavourite);

export { router as userRoute };
