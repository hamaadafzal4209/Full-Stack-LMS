import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import courseModel from "../model/courseModel";

export const uploadCourse = catchAsyncErrors(async)