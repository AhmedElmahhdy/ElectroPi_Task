import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const Checkout = () => {
  const { cart, total, setOrders } = useContext(AppContext)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [orderNotes, setOrderNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { t } = useTranslate()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      setError("Cart is empty")
      return
    }
    try {
      const { data } = await API.post("/orders", {
        items: cart,
        deliveryAddress,
        phoneNumber,
        orderNotes,
        paymentMethod,
      })
      setOrders((prev) => [data, ...prev])
      setSuccess("Order created successfully")
      localStorage.removeItem("cart")
      window.location.href = "/orders"
    } catch (err) {
      setError(err.response?.data?.message || "Order creation failed")
    }
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-2xl font-bold">{t("checkout")}</h2>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">{t("deliveryAddress")}</label>
            <input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">{t("phoneNumber")}</label>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">{t("orderNotes")}</label>
            <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3 h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">{t("paymentMethod")}</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3">
              <option value="Cash on Delivery">{t("cashOnDelivery")}</option>
              <option value="Online Payment">{t("onlinePayment")}</option>
            </select>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="space-y-2">
            <p>{t("subtotal")}: ${total.toFixed(2)}</p>
            <p className="font-bold text-xl">{t("total")}: ${total.toFixed(2)}</p>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white rounded-xl py-3">{t("placeOrder")}</button>
        </form>
      </div>
    </section>
  )
}

export default Checkout
