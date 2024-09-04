import express from "express";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layoutController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import { updateAccessToken } from "../controllers/userController";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);
layoutRouter.put(
  "/update-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  updateLayout
);
layoutRouter.get("/get-layout/:type", getLayoutByType);

export default layoutRouter;
