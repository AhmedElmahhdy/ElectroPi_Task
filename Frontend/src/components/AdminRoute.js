import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const AdminRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  return user?.role === "admin" ? children : <Navigate to="/" replace />
}

export default AdminRoute
