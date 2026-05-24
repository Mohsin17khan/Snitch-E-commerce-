import { setItems, addItems, incrementCartItem , decrementCartItem, removeCartItem } from "../state/cart.slice";
import { addToCart, getCartItems, incrementCartItemApi, decrementCartItemApi, removeCartItemApi } from "../services/cart.service";
import { useDispatch } from "react-redux";


export const useCart = () => {
    const dispatch = useDispatch();

    async function handleCartItems({ productId, variantId, quantity }){
        const response = await addToCart({ productId, variantId, quantity });   
        return response;
    }   

    async function handleGetCartItems () {
        const response = await getCartItems();
        if (response.success) {
            dispatch(setItems(response.cart));
        } else {
            console.error("Failed to fetch cart items:", response.message);
        }       
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const response = await incrementCartItemApi({ productId, variantId });
        if (response.success) {
            dispatch(incrementCartItem({ productId, variantId }));
        } else {
            console.error("Failed to increment cart item quantity:", response.message);
        }
        return response;

    }   

    async function handleDecrementCartItems({ productId, variantId }) {
        const response = await decrementCartItemApi({ productId, variantId });
        if (response.success) {
            dispatch(decrementCartItem({ productId, variantId }));
        } else {
            console.error("Failed to decrement cart item quantity:", response.message);
        }
        return response;
    }

    async function handleRemoveCartItem({ productId, variantId }) {
        const response = await removeCartItemApi({ productId, variantId });
        if (response.success) {
            dispatch(removeCartItem({ productId, variantId }));
        } else {
            console.error("Failed to remove cart item:", response.message);
        }   
        return response;
    }


    return { 
        handleCartItems,
        handleGetCartItems,
        handleIncrementCartItem,
        handleDecrementCartItems,
        handleRemoveCartItem
    }
}
