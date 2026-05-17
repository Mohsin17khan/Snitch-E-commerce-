import axios from 'axios';

const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
}) ;

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
