import express from "express";
import {
  activateUser,
  loginUser,
  registrationUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  UpdateUserInfo,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, UpdateUserInfo);

export default userRouter;
