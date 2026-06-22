import { createContext, useEffect, useMemo, useState } from "react"
import API from "../services/api"
import i18n from "../i18n"

export const AppContext = createContext()

const initialCart = JSON.parse(localStorage.getItem("cart")) || []
const initialLanguage = localStorage.getItem("appLanguage") || "en"

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null)
  const [cart, setCart] = useState(initialCart)
  const [language, setLanguage] = useState(initialLanguage)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem("appLanguage", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user))
    else localStorage.removeItem("user")
  }, [user])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product === product._id)
      if (existing) {
        showToast(i18n.t("productAdded", { name: product.name }))
        return current.map((item) =>
          item.product === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      showToast(i18n.t("productAdded", { name: product.name }))
      return [...current, { product: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.product !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setCart((current) => current.map((item) => item.product === productId ? { ...item, quantity } : item))
  }

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const value = {
    user,
    setUser,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    cartCount,
    logout,
    products,
    setProducts,
    orders,
    setOrders,
    language,
    setLanguage,
    toast,
    API,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
