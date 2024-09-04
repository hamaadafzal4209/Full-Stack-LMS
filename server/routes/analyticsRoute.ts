import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analyticsController";

const analyticsRouter = express.Router();
analyticsRouter.get(
  "/analytics-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/analytics-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getOrderAnalytics
);
analyticsRouter.get(
  "/analytics-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getCourseAnalytics
);

export default analyticsRouter;
