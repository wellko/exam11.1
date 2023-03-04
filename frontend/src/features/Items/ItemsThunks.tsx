import {createAsyncThunk} from "@reduxjs/toolkit";
import {Item, ItemData, OneItem} from "../../types";
import axiosApi from "../../axios-api";
import {RootState} from "../../app/store";

export const getItems = createAsyncThunk<Item[]>(
    'Items/getAll',
    async () => {
        try {
            const response = await axiosApi.get('/items');
            return response.data
        } catch (e) {
            return e;
        }
    }
)

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
    'Items/deleteOne',
    async (arg, {getState}) => {
        const user = getState().users.user;
        if (user) {
            try {
             await axiosApi.delete('/items/' + arg, {headers: {'Authorization': user.token}});
            } catch (e){
                throw e
            }
        }
    }
)

export const getOneItem = createAsyncThunk<OneItem[], string>(
    'Items/getOne',
    async (arg) => {
        try {
            const response = await axiosApi.get('/items/' + arg);
            return response.data
        } catch (e) {
            return e;
        }
    }
)

export const getItemByCategory = createAsyncThunk<Item[], string>(
    'Items/getBy',
    async (arg) => {
        try {
            const response = await axiosApi.get('/items?category=' + arg);
            return response.data
        } catch (e) {
            return e;
        }
    }
)

export const newItem = createAsyncThunk<void, ItemData, { state: RootState }>(
    'Items/newItem',
    async (arg, {getState}) => {
        const user = getState().users.user;
        if (user) {
            const formData = new FormData();
            formData.append('title', arg.title);
            formData.append('description', arg.description);
            formData.append('category', arg.category);
            formData.append('price', arg.price.toString());
            if (arg.image) {
                formData.append('image', arg.image);
            }
            try {
                const response = await axiosApi.post('/items', formData, {headers: {'Authorization': user.token}});
                return response.data
            } catch (e) {
                return e;
            }
        }
    }
)