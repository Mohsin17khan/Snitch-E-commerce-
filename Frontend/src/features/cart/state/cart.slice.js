import { createSlice } from "@reduxjs/toolkit";
import reducer from "../../products/state/product.slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalPrice: null,
        currency: null,
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            const cartData = action.payload;
            state.items = cartData.items || [];
            state.totalPrice = cartData.totalPrice || 0;
            state.currency = cartData.currency || "INR";
        },
        addItems: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                } else {
                    return item;
                }
            });
            state.totalPrice = state.items.reduce((total, item) => total + (item.product.price.priceAmount * item.quantity), 0);
        },
        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.map(item => {
                if (item.product._id === productId && item.variant === variantId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                } else {
                    return item;
                }
            });
            state.totalPrice = state.items.reduce((total, item) => total + (item.product.price.priceAmount * item.quantity), 0);
        },
        removeCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.filter(item => !(item.product._id === productId && item.variant === variantId));
            state.totalPrice = state.items.reduce((total, item) => total + (item.product.price.priceAmount * item.quantity), 0);
        }
    }
})

export const { setItems, addItems, incrementCartItem, decrementCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;