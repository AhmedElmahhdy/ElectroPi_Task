import { useContext, useEffect, useState } from "react"
import API from "../services/api"
import { AppContext } from "../context/AppContext"
import ProductCard from "../components/ProductCard"
import { useTranslate } from "../hooks/useTranslate"

const categories = ["All", "Pizza", "Burgers", "Pasta", "Drinks", "Desserts"]

const Menu = () => {
  const { products, setProducts } = useContext(AppContext)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(false)
  const { t } = useTranslate()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data } = await API.get("/products", {
        params: {
          search: search || undefined,
          category: category !== "All" ? category : undefined,
        },
      })
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [search, category, setProducts])

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full md:w-1/2 border rounded-xl px-4 py-3" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-xl px-4 py-3">
            {categories.map((item) => (<option key={item} value={item}>{item}</option>))}
          </select>
        </div>
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-slate-500">{t("noProducts")}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  )
}

export default Menu
