import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        count: Number(window.localStorage.getItem("count")) || 0,
        amount: Number(window.localStorage.getItem("amount")) || 0,
        items: window.localStorage.getItem("items") ? JSON.parse(window.localStorage.getItem("items")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { product } = action.payload;
            let flag = false;
            for(let i = 0; i < state.items.length; i++) {
                let item = state.items[i];
                if(item.id == product.id) {
                    flag = true;
                    state.items[i].quantity++;
                    break;
                }
            }
            if(flag == false) {
                state.items.push({ ...product, quantity: 1 });
            }
            state.count += 1;
            state.amount += product.price;
            window.localStorage.setItem("items", JSON.stringify(state.items));
            window.localStorage.setItem("count", state.count);
            window.localStorage.setItem("amount", state.amount);
            window.localStorage.setItem(product.id, window.localStorage.getItem(product.id) ? Number(window.localStorage.getItem(product.id)) + 1 : 1);
        },
        removeFromCart: (state, action) => {
            const { product } = action.payload;
            for(let i = 0; i < state.items.length; i++) {
                let item = state.items[i];
                if(item.id == product.id) {
                    if(item.quantity == 1) {
                        state.items = state.items.filter(item => item.id != product.id);
                    }
                    else {
                        state.items[i].quantity--;
                    }
                    break;
                }
            }
            state.count -= 1;
            state.amount -= product.price;
            window.localStorage.setItem("items", JSON.stringify(state.items));
            window.localStorage.setItem("count", state.count);
            window.localStorage.setItem("amount", state.amount);
            window.localStorage.setItem(product.id, Number(window.localStorage.getItem(product.id)) - 1);
        },
        clearItemFromCart: (state, action) => {
            const { product } = action.payload;
            state.items = state.items.filter(item => item.id != product.id);
            state.count = state.count - product.quantity;
            state.amount = state.amount - product.quantity * product.price;
            window.localStorage.removeItem(product.id);
            window.localStorage.setItem("items", JSON.stringify(state.items));
            window.localStorage.setItem("count", state.count);
            window.localStorage.setItem("amount", state.amount);
        },
        clearCart: (state) => {
            state.amount = 0;
            state.count = 0;
            state.items = [];
            const token = window.localStorage.getItem("token");
            window.localStorage.clear();
            window.localStorage.setItem("token", token);
        },
        resetState: (state) => {
            state.amount = 0;
            state.count = 0;
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, clearItemFromCart, clearCart, resetState } = cartSlice.actions;
export default cartSlice.reducer;