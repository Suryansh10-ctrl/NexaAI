import React, { useEffect } from 'react'
import { setUser } from '../auth.slice'
import { useNavigate } from 'react-router-dom'


const AuthSuccess = () => {
    useEffect(() => {
        const { setUser } = useAuth()
        const navigate = useNavigate()
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            console.log(params)
            const accessToken = params.get("token")
            console.log("token ", accessToken)

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get("http://localhost:3000/api/google/get-me", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.data.success) {
                        setUser(res.data.user) // save user in context api
                        navigate("/")
                    }
                } catch (err) {
                    console.error("fetching error: ", err)
                }
            }
        }
        handleAuth()
    }, [navigate])

    return (
        
        <h2>
            Logging in....
        </h2>
    )
}

export default AuthSuccess