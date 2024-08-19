import { ProductProps } from "./IProducts";

export interface IOrder {
    id: number;
    status: string;
    date: Date; // o Date dependiendo de cómo lo manejes
    userId: number;
    products: ProductProps[];
  }