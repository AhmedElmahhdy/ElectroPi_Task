import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import { useTranslate } from "../hooks/useTranslate"

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 0, totalRevenue: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [createForm, setCreateForm] = useState({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  const [editForm, setEditForm] = useState({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  const [editingProductId, setEditingProductId] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslate()

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      const { data: productsData } = await API.get("/products")
      const { data: ordersData } = await API.get("/orders")
      const revenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0)
      setStats({ totalOrders: ordersData.length, totalProducts: productsData.length, totalRevenue: revenue })
      setOrders(ordersData)
      setProducts(productsData)
      setRecentOrders(ordersData.slice(0, 5))
      setLoading(false)
    }
    loadStats()
  }, [])

  const statusCounts = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1
      return acc
    }, {})
  }, [orders])

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    const { data } = await API.post("/products", createForm)
    setProducts((prev) => [data, ...prev])
    setStats((prev) => ({ ...prev, totalProducts: prev.totalProducts + 1 }))
    setCreateForm({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editingProductId) return
    const { data } = await API.put(`/products/${editingProductId}`, editForm)
    setProducts((prev) => prev.map((item) => (item._id === editingProductId ? data : item)))
    setEditingProductId(null)
    setShowEditModal(false)
    setEditForm({ name: "", description: "", image: "", category: "Pizza", price: 0 })
  }

  const handleProductEdit = (product) => {
    setEditForm({ name: product.name, description: product.description, image: product.image, category: product.category, price: product.price })
    setEditingProductId(product._id)
    setShowEditModal(true)
  }

  const handleProductDelete = async (id) => {
    await API.delete(`/products/${id}`)
    setProducts((prev) => prev.filter((item) => item._id !== id))
    setStats((prev) => ({ ...prev, totalProducts: prev.totalProducts - 1 }))
  }

  if (loading) return <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">Loading...</div>

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold">{t("adminDashboard")}</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/products" className="rounded-3xl bg-slate-900 px-5 py-3 text-white">Manage Products</Link>
            <Link to="/admin/orders" className="rounded-3xl bg-slate-900 px-5 py-3 text-white">Monitor Orders</Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <p className="text-slate-500">{t("totalOrders")}</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <p className="text-slate-500">{t("totalProducts")}</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <p className="text-slate-500">{t("totalRevenue")}</p>
            <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="bg-white p-6 rounded-3xl shadow-sm">
              <p className="text-slate-500">{status}</p>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{t("recentOrders")}</h3>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order._id} className="border rounded-3xl p-4">
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <p className="text-slate-600">{t("orderStatus")} {order.orderStatus}</p>
                <p className="text-slate-600">${order.totalAmount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Product Management</h3>
              <p className="text-slate-500">Create, edit, and delete products directly from the dashboard.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{products.length} products</span>
          </div>
          <form onSubmit={handleProductSubmit} className="grid gap-4 md:grid-cols-2 mt-6">
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
                  <select value={createForm[field.key]} onChange={(e) => setCreateForm({ ...createForm, [field.key]: e.target.value })} className="w-full border rounded-xl px-4 py-3">
                    {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input type={field.type || "text"} value={createForm[field.key]} onChange={(e) => setCreateForm({ ...createForm, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })} className="w-full border rounded-xl px-4 py-3" />
                )}
              </div>
            ))}
            <button type="submit" className="bg-slate-900 text-white py-4 rounded-3xl md:col-span-2">Create Product</button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Product List</h3>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border rounded-3xl p-4">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-slate-600">{product.category} • ${product.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => handleProductEdit(product)} className="px-4 py-2 bg-slate-900 text-white rounded-xl">Edit</button>
                  <button onClick={() => handleProductDelete(product._id)} className="px-4 py-2 bg-red-600 text-white rounded-xl">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <EditModal visible={showEditModal} onClose={() => setShowEditModal(false)} form={editForm} setForm={setEditForm} onSubmit={handleEditSubmit} />
    </section>
  )
}

const EditModal = ({ visible, onClose, form, setForm, onSubmit }) => {
  if (!visible) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Edit Product</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">Close</button>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
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
          <button type="submit" className="bg-slate-900 text-white py-4 rounded-3xl md:col-span-2">Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default AdminDashboard
