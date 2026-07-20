import { RouterProvider } from "react-router-dom"
import {router} from "./app.routes.jsx"
import { useAuth } from "../features/auth/hooks/useAuth.js"
import { useEffect } from "react"

function App() {

  const auth = useAuth()
  useEffect(() => {
    auth.handleGetMe()
  }, []) /* prevents reloading or known as hydration */

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
