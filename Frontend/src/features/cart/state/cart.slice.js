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
            state.items = action.payload;
            state.totalPrice = action.payload.totalPrice;
            state.currency = action.payload.currency;
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
            })

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
            })
        },
        removeCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.filter(item => !(item.product._id === productId && item.variant === variantId));
        }
    }
})

export const { setItems, addItems, incrementCartItem, decrementCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;