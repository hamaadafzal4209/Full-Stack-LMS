import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import layoutModel from "../model/layoutModel";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";

// create layout
export const createLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type) {
        return next(new ErrorHandler("Type is required", 400));
      }

      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`Layout ${type} already exists`, 400));
      }

      if (type === "Banner") {
        const { image, title, subtitle } = req.body;

        if (!image || !title || !subtitle) {
          return next(new ErrorHandler("Image, title, and subtitle are required for Banner", 400));
        }

        const result = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: result.public_id,
              url: result.secure_url,
            },
            title,
            subtitle,
          },
        };

        await layoutModel.create(banner);
      } else if (type === "FAQ") {
        const { faq } = req.body;

        if (!faq || !Array.isArray(faq)) {
          return next(new ErrorHandler("FAQ must be an array", 400));
        }

        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await layoutModel.create({ type: "FAQ", faq: faqItems });
      } else if (type === "Categories") {
        const { categories } = req.body;

        if (!categories || !Array.isArray(categories)) {
          return next(new ErrorHandler("Categories must be an array", 400));
        }

        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        await layoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      } else {
        return next(new ErrorHandler("Invalid type provided", 400));
      }

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);