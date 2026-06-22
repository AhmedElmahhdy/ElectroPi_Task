import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
