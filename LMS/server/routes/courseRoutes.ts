import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
  addQuestionInCourse,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseByUser
);
courseRouter.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestionInCourse
);

export default courseRouter;
