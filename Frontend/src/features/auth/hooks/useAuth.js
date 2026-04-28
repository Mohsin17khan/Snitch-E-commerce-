 import { setUser, setError, setLoading } from "../state/auth.slice";
import { register, login, getMe } from "../services/auth.service";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    password,
    fullName,
    isSeller = false,
    contact,
  }) {
    const data = await register({
      email,
      password,
      fullName,
      isSeller,
      contact,
    });
    dispatch(setUser(data.user));
    return data.user
  }

  async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    return data.user
  }

  async function handleGetme() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleRegister,
    handleLogin,
    handleGetme,
  };
};
