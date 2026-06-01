import { setSellerProducts, setProducts } from "../state/product.slice";
import { createProduct, getSellerProduct, getAllProducts, getProductDetail, setProductVariant } from "../services/product.api";
import { useDispatch } from "react-redux"


export function useProduct(){
    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }
    
    async function handleGetSellerProduct() {
        const data = await getSellerProduct();
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts();
        dispatch(setProducts(data.allProducts));
    }

    async function handleGetProductDetail(productId) {
        const data = await getProductDetail(productId)
        return data.product
    }

    async function handleProductVarient(productId, newProductVariant) {
        const data = await setProductVariant(productId, newProductVariant);
        console.log("Product variant created:", data);
        return data;    
    }
    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProducts,
        handleGetProductDetail,
        handleProductVarient
    }
}