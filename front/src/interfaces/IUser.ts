export interface IUser {
    credential: {
        id: number;
        password: string;
    };
    id?: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}
