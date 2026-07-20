import { useDispatch } from "react-redux"
import { register,login,getMe,logout} from "../service/auth.api";
import { setUser,setLoading,setError,logoutUser } from "../auth.slice";



export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister(name, email, password) {
    try {
        dispatch(setLoading(true));

        const data = await register({
            name,
            email,
            password,
        });

        dispatch(setUser(data.user));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || "Registration Failed"));
    } finally {
        dispatch(setLoading(false));
    }
}


    async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email,password})
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(
            setError(error.response?.data?.message || "Login Failed")
            );
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message) || "Get Me Failed")
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogout(){
        try{
            await logout();
            dispatch(logoutUser());
        }catch(err){
            console.log(err)
        }
    }



    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    }
}