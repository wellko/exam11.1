import ObjectId = module

export interface IUser {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string;
}

export interface Item {
    title: string;
    description: string;
    price: number;
    image: string;
    category: ObjectId;
    user: ObjectId
}

export interface CategoryType {
    name: string;
}