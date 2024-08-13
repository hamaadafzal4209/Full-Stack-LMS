import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import courseModel from "../model/courseModel";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCourse } from "../services/courseService";

export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
  
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
  
        createCourse(data, res, next);
      } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
