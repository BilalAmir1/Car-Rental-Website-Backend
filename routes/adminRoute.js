import express from "express";
import { createAdmin } from "../controllers/adminCntrl.js";
// import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createAdmin);

export { router as adminRoute };
