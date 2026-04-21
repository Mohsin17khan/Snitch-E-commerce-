import { setUser, setError, setLoading } from "../state/auth.slice";
import { register, login } from "../services/auth.service";
import { useDispatch } from "react-redux"



export const useAuth = ( ) => {
    const dispatch = useDispatch()

    async function handleRegister ({email, password, fullName, isSeller, contact} ) {

        const data = await register({email, password, fullName, isSeller, contact});
        dispatch(setUser(data.user))
    
    }  

    async function handleLogin({ email, password }) {
        const data = await login({ email, password})
        dispatch(setUser(data.user))
    }

    return {
        handleRegister,
        handleLogin
    }
}