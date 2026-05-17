import { setItems, addItems } from "../state/cart.slice";
import { addToCart, getCartItems } from "../services/cart.service";
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
            dispatch(setItems(response.cart.items));
        } else {
            console.error("Failed to fetch cart items:", response.message);
        }       
    }
    return { 
        handleCartItems,
        handleGetCartItems
    }
}
