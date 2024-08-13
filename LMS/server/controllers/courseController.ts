import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse } from "../services/courseService";
import ErrorHandler from "../utils/ErrorHandler";

export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      // Ensure the thumbnail is provided
      if (!thumbnail) {
        return next(new ErrorHandler("Missing required parameter - file", 400));
      }

      const thumbnailUrl = data.thumbnail.url; // Extract the URL string
      const myCloud = await cloudinary.v2.uploader.upload(thumbnailUrl, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      // Ensure data matches schema structure
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
