import { IUser } from "./IUser";
import { ProductProps } from "./IProducts";

export interface Order {
    id: number;
    status: string;
    date: Date;
    userId: number;
    user?: IUser;
    products: ProductProps[];
}