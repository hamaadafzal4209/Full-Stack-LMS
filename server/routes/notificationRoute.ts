import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { getAllNotifications, updateNotificationStatus } from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllNotifications
);
notificationRouter.put(
  "/update-notification-status/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  updateNotificationStatus
);

export default notificationRouter;
