import express from "express";
import {
  activateUser,
  loginUser,
  registrationUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  getAllUsersByAdmin,
  updateUserRole,
  deleteUser,
  updateProfilePicture,
} from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
userRouter.put(
  "/update-user-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
userRouter.put(
  "/update-user-avatar",
  updateAccessToken,
  isAuthenticated,
  updateProfilePicture
);
userRouter.get(
  "/get-all-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllUsersByAdmin
);
userRouter.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  deleteUser
);

export default userRouter;
