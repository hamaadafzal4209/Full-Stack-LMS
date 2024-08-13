import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from "../controllers/courseController";

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

export default courseRouter;
