import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse } from "../services/courseService";
import ErrorHandler from "../utils/ErrorHandler";
import courseModel from "../model/courseModel";
import { redis } from "../utils/redis";

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

// Edit Course
export const editCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;

      // Check if course exists
      const courseData = await courseModel.findById(courseId);
      if (!courseData) {
        return next(new ErrorHandler("Course not found", 404));
      }

      if (thumbnail) {
        if (thumbnail.startsWith("https")) {
          // No need to update thumbnail if it starts with https
          data.thumbnail = {
            public_id: courseData.thumbnail.public_id,
            url: courseData.thumbnail.url,
          };
        } else {
          // Handle file URL (assuming it is a new URL to upload)
          await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });

          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      // Update course with new data
      const updatedCourse = await courseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );

      if (!updatedCourse) {
        return next(new ErrorHandler("Failed to update course", 400));
      }

      res.status(200).json({
        success: true,
        course: updatedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get single course --- without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExists = await redis.get(courseId);

      if (isCacheExists) {
        const course = JSON.parse(isCacheExists);
        res.status(200).json({
          success: true,
          course: course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);

        res.status(201).json({
          success: true,
          course: course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


