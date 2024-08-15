import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./utils/db";
import userRouter from "./routes/userRoutes";
import { v2 as cloudinary } from "cloudinary";
import courseRouter from "./routes/courseRoutes";
import orderRouter from "./routes/orderRoutes";
import notificationRouter from "./routes/notificationRoute";
require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "50mb" }));

// Middleware to parse cookies
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log("Request body:", req.body);
  next();
});

// Import routes
app.use("/api/v1/", userRouter);
app.use("/api/v1/", courseRouter);
app.use("/api/v1/", orderRouter);
app.use("/api/v1/", notificationRouter);

// Test API route
app.post("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working properly",
  });
});

// Handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost ${PORT}`);
  connectDb();
});
