import { Router } from "express";
import validateOrderCreate from "../middlewares/orderCreate.middleware";
import { createOrder } from "../controllers/order.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const ordersRouter = Router();

ordersRouter.post("/", checkLogin, validateOrderCreate, createOrder);

export default ordersRouter;
