import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/login"
import Register from "../features/auth/pages/Register"
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import AuthSuccess from "../features/auth/pages/AuthSuccess";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/auth/success",
        element: <AuthSuccess/>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected>
            <Dashboard />
        </Protected>
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    }
])
