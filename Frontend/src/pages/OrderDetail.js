import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"
import { useTranslate } from "../hooks/useTranslate"

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslate()

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true)
      const { data } = await API.get(`/orders/${id}`)
      setOrder(data)
      setLoading(false)
    }
    loadOrder()
  }, [id])

  if (loading || !order) return <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">Loading...</div>

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-2xl font-bold">{t("orderStatus")} #{order._id.slice(-6)}</h2>
        <p>{t("orderStatus")}: {order.orderStatus}</p>
        <p>{t("deliveryAddress")}: {order.deliveryAddress}</p>
        <p>{t("phoneNumber")}: {order.phoneNumber}</p>
        <p>{t("paymentMethod")}: {order.paymentMethod}</p>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.product} className="border rounded-3xl p-4 flex items-center gap-4">
              <img className="w-20 h-20 object-cover rounded-2xl" src={item.image} alt={item.name} />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>{t("quantity")}: {item.quantity}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-bold text-lg">{t("total")}: ${order.totalAmount.toFixed(2)}</p>
      </div>
    </section>
  )
}

export default OrderDetail
