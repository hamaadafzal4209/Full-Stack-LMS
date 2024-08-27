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
    // Log the incoming data for debugging
    console.log("Creating course with data:", data);

    const course = await courseModel.create(data);

    // Check if the course was successfully created
    if (!course) {
      throw new Error("Course creation failed");
    }

    res.status(200).json({
      success: true,
      course: course,
    });
  } catch (error: any) {
    console.error("Error creating course:", error);
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
