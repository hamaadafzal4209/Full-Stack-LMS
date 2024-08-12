import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import courseModel from "../model/courseModel";
import ErrorHandler from "../utils/ErrorHandler";

export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
