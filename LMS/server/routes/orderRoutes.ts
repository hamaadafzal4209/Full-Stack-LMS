import express from "express";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middlewares/auth";
import {
  createOrder,
  getAllOrdersByAdmin,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);
orderRouter.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrdersByAdmin
);

export default orderRouter;
