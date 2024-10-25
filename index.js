import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { carRoute } from "./routes/carRoute.js";
import { adminRoute } from "./routes/adminRoute.js";
import { bookingRoute } from "./routes/bookingRoute.js";
import { blogRoute } from "./routes/blogRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is at ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/car", carRoute);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/blog", blogRoute);