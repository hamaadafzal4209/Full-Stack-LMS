import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { editCourse, uploadCourse } from "../controllers/courseController";

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

export default courseRouter;
