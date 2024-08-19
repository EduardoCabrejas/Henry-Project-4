import { AppDataSource } from "../config/dataSource";
import { Order } from "../entities/Order";

export const OrderRepository = AppDataSource.getRepository(Order);
