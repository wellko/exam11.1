import {GlobalError, User, ValidationError} from '../../types'
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {login, logoutApi, register} from './UsersThunks';

interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
    logout: boolean;
}

const initialState: UsersState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    logout: false
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOut: state => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.registerLoading = false;
            state.user = user;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });
        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        })
        builder.addCase(logoutApi.pending, (state) => {
            state.logout = true;
        });
        builder.addCase(logoutApi.fulfilled, (state) => {
            state.logout = false;
        });
        builder.addCase(logoutApi.rejected, (state) => {
            state.logout = false;
        })
    }
});

export const UsersReducer = UsersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogOut= (state: RootState) => state.users.logout;
export const {logOut} = UsersSlice.actions;