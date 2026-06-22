import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const Register = () => {
  const { setUser } = useContext(AppContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { t } = useTranslate()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post("/users/register", { name, email, password })
      localStorage.setItem("authToken", data.token)
      setUser(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Register failed")
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
      <form onSubmit={submit} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg space-y-5">
        <h2 className="text-2xl font-bold">{t("register")}</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3" placeholder="********" />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button className="w-full bg-slate-900 text-white rounded-xl py-3">{t("register")}</button>
        <p className="text-slate-600 text-sm">Already registered? <Link to="/login" className="text-slate-900">{t("login")}</Link></p>
      </form>
    </div>
  )
}

export default Register
