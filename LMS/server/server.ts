import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./utils/db";
import userRouter from './routes/userRoutes'
require("dotenv").config();

const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// import routes
app.use("/api/v1/user", userRouter)

// testing api
app.post("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working properly",
  });
});

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost ${process.env.PORT}`);
  connectDb();
});