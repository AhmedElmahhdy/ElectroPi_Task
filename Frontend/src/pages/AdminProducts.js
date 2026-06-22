import { useEffect, useState } from "react"
import API from "../services/api"
import { useTranslate } from "../hooks/useTranslate"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  const [editingId, setEditingId] = useState(null)
  const { t } = useTranslate()

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get("/products")
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (editingId) {
      const { data } = await API.put(`/products/${editingId}`, form)
      setProducts((prev) => prev.map((item) => (item._id === editingId ? data : item)))
      setEditingId(null)
    } else {
      const { data } = await API.post("/products", form)
      setProducts((prev) => [data, ...prev])
    }
    setForm({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  }

  const remove = async (id) => {
    await API.delete(`/products/${id}`)
    setProducts((prev) => prev.filter((item) => item._id !== id))
  }

  const edit = (product) => {
    setForm({ name: product.name, description: product.description, image: product.image, category: product.category, price: product.price })
    setEditingId(product._id)
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">{t("adminDashboard")}</h2>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Name", key: "name" },
              { label: "Description", key: "description" },
              { label: "Image URL", key: "image" },
              { label: "Category", key: "category", type: "select", options: ["Pizza", "Burgers", "Pasta", "Drinks", "Desserts"] },
              { label: "Price", key: "price", type: "number" },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                {field.type === "select" ? (
                  <select value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full border rounded-xl px-4 py-3">
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input type={field.type || "text"} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })} className="w-full border rounded-xl px-4 py-3" />
                )}
              </div>
            ))}
            <button type="submit" className="bg-slate-900 text-white py-4 rounded-3xl md:col-span-2">{editingId ? "Update Product" : "Create Product"}</button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border rounded-3xl p-4">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-slate-600">{product.category} • ${product.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => edit(product)} className="px-4 py-2 bg-slate-900 text-white rounded-xl">Edit</button>
                  <button onClick={() => remove(product._id)} className="px-4 py-2 bg-red-600 text-white rounded-xl">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminProducts
