import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = req.body.userId;
    const newOrder = await createOrderService({ userId, products });
    res.send(newOrder);
  }
);
