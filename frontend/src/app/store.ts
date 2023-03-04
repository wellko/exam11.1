import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {UsersReducer} from "../features/Users/UsersSlice";
import {ItemsReducer} from "../features/Items/ItemsSlice";
import {CategoriesReducer} from "../features/categories/categoriesSlice";

const usersPersistConfig = {
    key: 'fafafo:Users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    items: ItemsReducer,
    categories: CategoriesReducer,
    users: persistReducer(usersPersistConfig, UsersReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;