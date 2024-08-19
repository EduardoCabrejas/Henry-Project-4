import { AppDataSource } from "../config/dataSource";
import { Category } from "../entities/Category";

export const CategoryRepository = AppDataSource.getRepository(Category);