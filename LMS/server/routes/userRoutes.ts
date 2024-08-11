import express from "express";
import {
  activateUser,
  loginUser,
  registrationUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);

export default userRouter;
