import axios from 'axios';

const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
});

export const addToCart = async ( { productId, variantId, quantity } ) => {
    try {
        const response = await cartApiInstance.post(`/add/${ productId }/${ variantId }`, { quantity });        
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to add to cart"
        };
    }       
}

export const getCartItems = async ( ) => {
    try {
        const response = await cartApiInstance.get("/");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching cart items:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to fetch cart items"
        };
    }
}


export const incrementCartItemApi = async ({ productId, variantId }) => {
    try {
        const response = await cartApiInstance.patch(`/quantity/increment/${ productId }/${ variantId }`);  
        return response.data;
    }
    catch (error) {
        console.error("Error incrementing cart item quantity:", error);
        return {    
            success: false, 
            message: error.response?.data?.message || error.message || "Failed to increment cart item quantity"
        };
    }
}

export const decrementCartItemApi = async ({ productId, variantId }) => {
    try {
        const response = await cartApiInstance.patch(`/quantity/decrement/${ productId }/${ variantId }`);      
        return response.data;
    }   
    catch (error) {
        console.error("Error decrementing cart item quantity:", error);
        return {    
            success: false,
            message: error.response?.data?.message || error.message || "Failed to decrement cart item quantity"
        };
    }   
}

export const removeCartItemApi = async ({ productId, variantId }) => {
    try {
        const response = await cartApiInstance.delete(`/remove/${ productId }/${ variantId }`);
        return response.data;
    }   
    catch (error) {     
        console.error("Error removing cart item:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to remove cart item"
        };
    }       
}


export const createOrderApi = async () => {
    try {
        const response = await cartApiInstance.post("/payment/create-order");
        return response.data;
    }
    catch (error) { 
        console.error("Error creating order:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to create order"
        };
    }
}

export const verifyPaymentApi = async ( { razorpay_order_id ,razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApiInstance.post("/payment/order-verify", { razorpay_order_id ,razorpay_payment_id, razorpay_signature });
    try {
        return response.data;
    }
    catch (error) { 
        console.error("Error verifying payment:", error);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to verify payment"
        };  
    } 
}