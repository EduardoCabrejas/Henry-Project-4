export interface Category {
    id: number;
    name: string;
    products?: Product[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
    category?: Category;
}

export interface Credential {
    id: number;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: 'admin' | 'user';
    credential: Credential;
    orders: Order[];
}

export interface Order {
    id: number;
    status: string;
    date: Date;
    userId: number;
    user?: User;
    products: Product[];
}

export interface ProductsResponse {
    products: Product[];
}
