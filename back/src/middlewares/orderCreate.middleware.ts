import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import { checkUserExists } from "../services/user.service";
import { checkProductExists } from "../services/products.service";

const validateOrderFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products } = req.body;
  if (!products.length)
    next(new ClientError("Order must have an array of products"));
  if (!products || products.length === 0)
    return next(new ClientError("Order must have at least one item"));
  next();
};

const validateItemsExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { products } = req.body;

  for await (const itemId of products) {
    const exists = await checkProductExists(itemId);
    if (!exists)
      return next(
        new ClientError("One or more items do not exist in the database")
      );
  }
  next();
};

export default [validateOrderFields, validateItemsExist];
