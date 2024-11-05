import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.localStorage.getItem("token") || null
    },
    reducers: {
        addToken: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            window.localStorage.setItem("token", token);
        },
        removeToken: (state) => {
            state.token = null;
            window.localStorage.removeItem("token");
        }
    }
});

export const { addToken, removeToken } = authSlice.actions;
export default authSlice.reducer;