import axios from "axios"


const api = axios.create({
    baseURL: "https://nexaai-mb5t.onrender.com",
    withCredentials: true,
})

export async function register({ name, email, password }) {
    const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
    });

    return response.data;
}


export async function login({email,password}){
    const response = await api.post('/api/auth/login', {email,password})
    return response.data
}

export async function getMe(){
    const response = await api.get('/api/auth/get-me')
    return response.data
}

export async function logout(){
    const response = await api.post('/api/auth/logout')
    return response.data
}

