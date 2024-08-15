import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { getAllNotifications } from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllNotifications
);

export default notificationRouter;
