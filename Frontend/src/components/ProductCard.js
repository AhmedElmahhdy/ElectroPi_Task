import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext)
  const { t } = useTranslate()

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
      <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
      <div className="p-4 space-y-2">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-slate-600">{product.category}</p>
        </div>
        <p className="text-slate-600 text-sm">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)} className="bg-slate-900 text-white px-3 py-1 rounded hover:bg-slate-700">
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
