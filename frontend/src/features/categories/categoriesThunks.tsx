import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category} from "../../types";
import axiosApi from "../../axios-api";

export const getCategories = createAsyncThunk<Category[]>(
    'categories/getAll',
    async () => {
        try {
            const response = await axiosApi.get('/categories');
            return response.data
        } catch (e) {
            return e;
        }
    }
)