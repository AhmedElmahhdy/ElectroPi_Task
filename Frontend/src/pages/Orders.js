import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const Orders = () => {
  const { orders, setOrders } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslate()

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true)
      const { data } = await API.get("/orders/my")
      setOrders(data)
      setLoading(false)
    }
    loadOrders()
  }, [setOrders])

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">{t("orderHistory")}</h2>
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-slate-500">{t("noOrders")}</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order._id} to={`/orders/${order._id}`} className="block border rounded-3xl p-5 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div>
                    <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                    <p className="text-slate-600">{t("orderStatus")}: {order.orderStatus}</p>
                  </div>
                  <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Orders
