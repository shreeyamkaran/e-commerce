import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import authReducer from "./authSlice.js";

export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
});