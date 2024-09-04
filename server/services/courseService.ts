import { NextFunction, Response } from "express";
import courseModel from "../model/courseModel";
import ErrorHandler from "../utils/ErrorHandler";

// Create a new course
export const createCourse = async (
  data: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseModel.create(data);

    res.status(200).json({
      success: true,
      course: course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all courses
export const getAllCoursesService = async (res: Response) => {
  try {
    const courses = await courseModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};
