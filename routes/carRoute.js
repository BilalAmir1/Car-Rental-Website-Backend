import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
} from "../controllers/carCntrl.js";
const router = express.Router();

router.post("/create", createCar);
router.get("/allcars", getAllCars);
router.get("/:id", getCar);
router.delete("/:id", deleteCar);

export { router as carRoute };
