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