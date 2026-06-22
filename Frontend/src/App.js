import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { AppProvider, AppContext } from "./context/AppContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import OrderDetail from "./pages/OrderDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AdminDashboard from "./pages/AdminDashboard"
import AdminProducts from "./pages/AdminProducts"
import AdminOrders from "./pages/AdminOrders"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

const AppContent = () => {
  const { toast } = useContext(AppContext)

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-xl">
            {toast.message}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
