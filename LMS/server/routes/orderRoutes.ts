import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/auth";
import { createOrder } from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post(
    "/create-order",
    updateAccessToken,
    isAuthenticated,
    createOrder
  );

export default orderRouter;