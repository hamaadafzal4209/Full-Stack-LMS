import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import orderModel, {IOrder} from "../model/orderModel";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import sendMail from "../utils/sendMail";
import path from "path";
import ejs from 'ejs';
import userModel from "../model/userModel";
import courseModel, { ICourse } from "../model/courseModel";
import { newOrder } from "../services/orderService";
import stripe from 'stripe';
import notificationModel from "../model/notificationModel";

export const createOrder = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;
  
        // if (payment_info) {
        //   if ("id" in payment_info) {
        //     const paymentIntentId = payment_info.id;
        //     const paymentIntent = await stripe.paymentIntents.retrieve(
        //       paymentIntentId
        //     );
  
        //     if (paymentIntent.status !== "succeeded") {
        //       return next(new ErrorHandler("Payment failed", 400));
        //     }
        //   }
        // }
  
        const user = await userModel.findById(req.user?._id);
  
        const isCourseExistByUser = user?.courses.some(
          (course: any) => course._id.toString() === courseId
        );
        if (isCourseExistByUser) {
          return next(new ErrorHandler("Course already exists", 400));
        }
  
        const course:ICourse | null = await courseModel.findById(courseId);
        if (!course) {
          return next(new ErrorHandler("Course not found", 404));
        }
  
        const data: any = {
          courseId: course._id,
          userId: user?._id,
          payment_info: payment_info,
        };
  
        const mailData = {
          order: {
            _id: course._id.toString().slice(0, 6),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          },
        };
  
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/orderConfirmation.ejs"),
          { order: mailData }
        );
  
        try {
          if (user) {
            await sendMail({
              email: user.email,
              subject: "Order Confirmation",
              template: "orderConfirmation.ejs",
              data: mailData,
            });
          }
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
  
        user?.courses.push(course._id);
        await redis.set(req.user?._id, JSON.stringify(user));
        await user?.save();
  
        await notificationModel.create({
          user: user?._id,
          title: "New Order",
          message: `You have a new order for ${course.name}`,
        });
        
        course.purchased += 1;
  
        await course.save();
  
        newOrder(data, res, next);
      }  catch (error : any) {
        return next(new ErrorHandler(error.message,400))
    }
})