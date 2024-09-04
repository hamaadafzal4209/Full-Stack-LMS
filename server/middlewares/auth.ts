import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "./catchAsyncErrors";

// Authenticated users
export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token as string;
    if (!accessToken) {
      return next(new ErrorHandler("No access token provided. Please log in.", 401));
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string) as JwtPayload;

      const user = await redis.get(decoded.id);
      if (!user) {
        return next(new ErrorHandler("Session expired. Please log in again.", 401));
      }

      req.user = JSON.parse(user);
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired access token. Please log in again.", 401));
    }
  }
);


// Authorize user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Roles: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
