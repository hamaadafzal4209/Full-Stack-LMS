import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../model/userModel";
import orderModel from "../model/orderModel";

// Get users analytics -- admin
export const getUserAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);
      res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get order analytics -- admin
export const getAnalyticsOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(orderModel);
      res.status(200).json({
        success: true,
        orders: orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);