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
    console.log(response)
    return response.data   
}

export async function getProductDetail(productId) {
    const response = await apiInstance.get(`/productDetail/${productId}`)
    return response.data
    
}