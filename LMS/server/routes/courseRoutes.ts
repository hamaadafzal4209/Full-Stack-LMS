import express from 'express';
import { updateAccessToken } from '../controllers/userController';
import { authorizeRole, isAuthenticated } from '../middlewares/auth';
import { uploadCourse } from '../controllers/courseController';

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

export default courseRouter;