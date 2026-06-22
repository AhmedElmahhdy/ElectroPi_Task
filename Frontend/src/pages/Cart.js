import { useContext, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useContext(AppContext)
  const { t } = useTranslate()
  const navigate = useNavigate()

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">{t("cart")}</h2>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600">{t("noProducts")}</p>
            <Link to="/menu" className="mt-4 inline-block text-slate-900 underline">{t("menu")}</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.product} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-slate-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.product, Number(e.target.value))} className="w-20 border rounded-xl px-3 py-2" />
                  <button onClick={() => removeFromCart(item.product)} className="text-red-600">{t("remove")}</button>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
              <div className="space-y-1">
                <p>{t("subtotal")}: ${subtotal.toFixed(2)}</p>
                <p className="font-bold text-xl">{t("total")}: ${total.toFixed(2)}</p>
              </div>
              <button onClick={() => navigate("/checkout")} className="bg-slate-900 text-white px-6 py-3 rounded-xl">{t("checkout")}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
