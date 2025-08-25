import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    users: [],
    user: null,
    error: null,
    message: null,
    isAuthenticated: false,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegisterSuccess: (state, action) => {
            state.message = action.payload;
        },
        userRegisterFail: (state, action) => {
            state.error = action.payload;
        },

        userLoginSuccess: (state, action) => {
            state.message = action.payload;
        },
        userLoginFail: (state, action) => {
            state.error = action.payload;
        },

        loadUserSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loadUserFail: (state, action) => {
            state.user = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        userLogoutSuccess: (state, action) => {
            state.message = action.payload;
        },
        userLogoutFail: (state, action) => {
            state.error = action.payload;
        },

        getAllUserSuccess: (state, action) => {
            state.users = action.payload;
        },
        getAllUserFail: (state, action) => {
            state.error = action.payload;
        },

        clearErrors: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
});


export const {
    userLoginFail, userLoginSuccess, userLogoutFail, userLogoutSuccess, userRegisterFail, userRegisterSuccess,
    loadUserFail, loadUserSuccess, getAllUserFail, getAllUserSuccess, clearErrors, clearMessage,
} = userSlice.actions;

export default userSlice;
