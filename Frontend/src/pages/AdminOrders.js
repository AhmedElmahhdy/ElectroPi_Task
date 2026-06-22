import { useEffect, useState } from "react"
import API from "../services/api"
import { useTranslate } from "../hooks/useTranslate"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const { t } = useTranslate()

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true)
      const { data } = await API.get("/orders", { params: { status: status || undefined, search: search || undefined } })
      setOrders(data)
      setLoading(false)
    }
    loadOrders()
  }, [status, search])

  const updateStatus = async (id, newStatus) => {
    const { data } = await API.put(`/orders/${id}/status`, { orderStatus: newStatus })
    setOrders((prev) => prev.map((order) => (order._id === id ? data : order)))
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">{t("adminDashboard")}</h2>
          <div className="flex gap-3">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-xl px-4 py-3">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-xl px-4 py-3" placeholder="Search orders" />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-slate-500 py-20">No orders found.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-3xl p-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  <p className="text-slate-600">{order.user?.email}</p>
                  <p className="text-slate-600">{t("orderStatus")}: {order.orderStatus}</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"].map((state) => (
                    <button key={state} onClick={() => updateStatus(order._id, state)} className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm">
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminOrders
