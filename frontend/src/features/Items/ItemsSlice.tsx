import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Item, OneItem} from "../../types";
import {deleteItem, getItemByCategory, getItems, getOneItem, newItem} from "./ItemsThunks";

interface Initial {
    items: Item[];
    oneItem: OneItem[];
    loading: boolean;
    posting: boolean;
    deleting: boolean;
}

const initialState: Initial = {
    items: [],
    oneItem: [],
    loading: false,
    posting: false,
    deleting: false,
}

export const ItemsSlice = createSlice({
    name: 'Items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        builder.addCase(getItems.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(getItemByCategory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getItemByCategory.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        builder.addCase(getItemByCategory.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(getOneItem.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getOneItem.fulfilled, (state, action) => {
            state.oneItem = action.payload;
            state.loading = false;
        })
        builder.addCase(getOneItem.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(newItem.pending, (state) => {
            state.posting = true;
        })
        builder.addCase(newItem.fulfilled, (state) => {
            state.posting = false;
        })
        builder.addCase(newItem.rejected, (state) => {
            state.posting = false;
        })
        builder.addCase(deleteItem.pending, (state) => {
            state.deleting = true;
        })
        builder.addCase(deleteItem.fulfilled, (state) => {
            state.deleting = false;
        })
        builder.addCase(deleteItem.rejected, (state) => {
            state.deleting = false;
        })
    }
})

export const ItemsReducer = ItemsSlice.reducer;
export const selectStateOfItems = (state: RootState) => state.items.items;
export const selectStatusOfItems = (state: RootState) => state.items.loading;
export const selectStatusOfPostingItems = (state: RootState) => state.items.posting;
export const selectStateOfOneItem = (state: RootState) => state.items.oneItem;
export const selectStatusOfDeleting = (state: RootState) => state.items.deleting;