import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";

export const ProductRepository = AppDataSource.getRepository(Product);