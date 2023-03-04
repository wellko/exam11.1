import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Category} from "../../types";
import {getCategories} from "./categoriesThunks";

interface Initial {
    categories: Category[];
    loading: boolean;
}

const initialState: Initial = {
    categories: [],
    loading: false,
}

export const CategoriesSlice = createSlice({
    name: 'Categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const CategoriesReducer = CategoriesSlice.reducer;
export const selectStateOfCategories= (state: RootState) => state.categories.categories;
export const selectStatusOfCategories = (state: RootState) => state.categories.loading;