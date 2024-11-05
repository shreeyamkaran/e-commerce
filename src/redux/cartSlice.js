import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        count: window.localStorage.getItem("count") || 0,
        amount: window.localStorage.getItem("amount") || 0,
        items: window.localStorage.getItem("items") ? JSON.parse(window.localStorage.getItem("items")) : []
    },
    reducers: {
        addToCart: (state, action) => {
            const { product } = action.payload;
            let localProduct = state.items.filter(item => item.id == product.id);
            if(localProduct.length == 0) {
                state.items.push({ ...product, quantity: 1 });
            }
            else {
                localProduct[0].quantity++;
            }
            state.count++;
            state.amount += product.price;
            window.localStorage.setItem("count", state.count);
            window.localStorage.setItem("items", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            
        },
        clearCart: (state, action) => {

        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;