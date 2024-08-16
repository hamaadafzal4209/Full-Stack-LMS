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

// Update layout properties
export const updateLayout = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { type } = req.body;
  
        if (type === "Banner") {
          const bannerData: any = await layoutModel.findOne({ type: "Banner" });
  
          const { image, title, subtitle } = req.body;
  
          const data = image.startsWith("https")
            ? bannerData
            : await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
              });
  
          const banner = {
            type: "Banner",
            image: {
              public_id: image.startsWith("https")
                ? bannerData.banner.image.public_id
                : data.public_id,
              url: image.startsWith("https")
                ? bannerData.banner.image.url
                : data.secure_url,
            },
            title,
            subtitle,
          };
  
          if(bannerData) {
            await layoutModel.findByIdAndUpdate(bannerData._id, { banner });
          } else {
            await layoutModel.create(banner);
          }
        }
  
        if (type === "FAQ") {
          const { faq } = req.body;
          const FaqData = await layoutModel.findOne({ type: "FAQ" });
          const faqItems = await Promise.all(
            faq.map(async (item: any) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );
  
          await layoutModel.findByIdAndUpdate(FaqData?._id, {
            type: "FAQ",
            faq: faqItems,
          });
        }
  
        if (type === "Categories") {
          const { categories } = req.body;
          const categoriesData = await layoutModel.findOne({
            type: "Categories",
          });
          const categoriesItems = await Promise.all(
            categories.map(async (item: any) => {
              return {
                title: item.title,
              };
            })
          );
  
          await layoutModel.findByIdAndUpdate(categoriesData?._id, {
            type: "Categories",
            categories: categoriesItems,
          });
        }
  
        res.status(200).json({
          success: true,
          message: "Layout updated successfully",
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );