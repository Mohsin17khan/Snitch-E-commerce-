import { setItems, addItems, incrementCartItem , decrementCartItem, removeCartItem } from "../state/cart.slice";
import { addToCart, getCartItems, incrementCartItemApi, decrementCartItemApi, removeCartItemApi, createOrderApi, verifyPaymentApi } from "../services/cart.service";
import { useDispatch } from "react-redux";


export const useCart = () => {
    const dispatch = useDispatch();

    async function handleCartItems({ productId, variantId, quantity }){
        const response = await addToCart({ productId, variantId, quantity });
        if (response.success) {
            // Fetch updated cart after adding item
            const cartResponse = await getCartItems();
            if (cartResponse.success) {
                dispatch(setItems(cartResponse.cart));
                console.log("Cart updated successfully:", cartResponse.cart);
            } else {
                dispatch(addItems(response.item));
            }
        }
        return response;
    }   

    async function handleGetCartItems () {
        const response = await getCartItems();
        console.log("Cart API Response:", response);
        if (response.success) {
            console.log("Setting cart items:", response.cart);
            dispatch(setItems(response.cart));
            console.log("Cart items set successfully", response.cart);
        } else {
            console.error("Failed to fetch cart items:", response.message);
        }       
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        const response = await incrementCartItemApi({ productId, variantId });
        if (response.success) {
            if (response.cart) {
                dispatch(setItems(response.cart));
            } else {
                dispatch(incrementCartItem({ productId, variantId }));
            }
        } else {
            console.error("Failed to increment cart item quantity:", response.message);
        }
        return response;

    }   

    async function handleDecrementCartItems({ productId, variantId }) {
        const response = await decrementCartItemApi({ productId, variantId });
        if (response.success) {
            if (response.cart) {
                dispatch(setItems(response.cart));
            } else {
                dispatch(decrementCartItem({ productId, variantId }));
            }
        } else {
            console.error("Failed to decrement cart item quantity:", response.message);
        }
        return response;
    }

    async function handleRemoveCartItem({ productId, variantId }) {
        const response = await removeCartItemApi({ productId, variantId });
        if (response.success) {
            if (response.cart) {
                dispatch(setItems(response.cart));
            } else {
                dispatch(removeCartItem({ productId, variantId }));
            }
        } else {
            console.error("Failed to remove cart item:", response.message);
        }   
        return response;
    }

    async function handleCreateOrder() {
        const response = await  createOrderApi();
        if (response.success) {
            console.log("Order created successfully:", response.order);
            return response.order;
        }
    }

    async function handleVerifyPayment({ razorpay_order_id ,razorpay_payment_id, razorpay_signature }) {
        const response = await verifyPaymentApi({ razorpay_order_id ,razorpay_payment_id, razorpay_signature });
        return response.success;
    }


    return { 
        handleCartItems,
        handleGetCartItems,
        handleIncrementCartItem,
        handleDecrementCartItems,
        handleRemoveCartItem,
        handleCreateOrder,
        handleVerifyPayment
    }
}
