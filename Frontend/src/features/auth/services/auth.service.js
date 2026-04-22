import axios from 'axios';


const API_INSTANCE = axios.create({
    baseURL:"/api/auth",
    withCredentials:true
});


export const register = async ({ email, password, fullName, contact, isSeller = false}) =>{
    try {
        const response = await API_INSTANCE.post('/register', {
            email,
            password,
            fullName,
            contact,
            isSeller
        });
        return response.data;
        
    } catch (error) {
        throw error;
    }
}

export const login = async ({email, password}) =>  {

    try {
    const response = await API_INSTANCE.post("/login",{
        email,
        password
    });
    return response.data
        
    } catch (error) {
        throw error
    }
 
}