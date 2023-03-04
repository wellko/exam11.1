export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface ItemData {
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
}

export interface Item {
    title: string;
    price: number;
    image: string | null;
    _id: string;
}

export interface OneItem extends Item {
    description: string;
    user: {
        _id: string;
        displayName: string;
        phoneNumber: string;
    }
}

export interface Category {
    name : string;
    _id:string;
}