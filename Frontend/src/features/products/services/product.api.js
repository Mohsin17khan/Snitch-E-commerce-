import axios from 'axios'

const apiInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true
});

export async function createProduct(formData) {
    const response = await apiInstance.post("/", formData)
    return response.data
}

export async function getSellerProduct() {
    const response = await apiInstance.get("/seller");
    return response.data
}

export async function  getAllProducts() {
    const response = await apiInstance.get("/allProducts");
    return response.data   
}

export async function getProductDetail(productId) {
    const response = await apiInstance.get(`/productDetail/${productId}`)
    return response.data
    
}

export async function setProductVariant(productId, newProductVariant) {
    console.log(newProductVariant)
    const formData = new FormData();
    newProductVariant.images.forEach((img) => {
        formData.append("images", img.file);
    });
    
    formData.append("stock", newProductVariant.stock);
    formData.append("priceAmount", newProductVariant.price.amount);
    formData.append("priceCurrency", newProductVariant.price.currency);
    formData.append("attributes", JSON.stringify(newProductVariant.attributes));

    const response = await apiInstance.post(`/productVariant/${productId}`, formData);
    console.log("form data", formData)
    console.log("response", response);
    return response.data;
}   
