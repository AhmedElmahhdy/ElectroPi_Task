import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useTranslate } from "../hooks/useTranslate"

const Navbar = () => {
  const { user, logout, cartCount } = useContext(AppContext)
  const { t, language, setLang } = useTranslate()

  return (
    <nav className="bg-white shadow-sm px-4 py-3 flex flex-wrap items-center justify-between">
      <Link to="/" className="text-xl font-bold text-slate-900">{t("appTitle")}</Link>
      <div className="flex items-center gap-3">
        <NavLink to="/" className="text-slate-700 hover:text-slate-900">{t("home")}</NavLink>
        <NavLink to="/menu" className="text-slate-700 hover:text-slate-900">{t("menu")}</NavLink>
        <NavLink to="/cart" className="relative text-slate-700 hover:text-slate-900">
          {t("cart")}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </NavLink>
        {user?.role === "admin" && (
          <NavLink to="/admin" className="text-slate-700 hover:text-slate-900">{t("admin")}</NavLink>
        )}
        {user ? (
          <button onClick={logout} className="text-red-600 hover:text-red-800">{t("logout")}</button>
        ) : (
          <NavLink to="/login" className="text-slate-700 hover:text-slate-900">{t("login")}</NavLink>
        )}
        <select value={language} onChange={(e) => setLang(e.target.value)} className="border rounded px-2 py-1">
          <option value="en">{t("english")}</option>
          <option value="ar">{t("arabic")}</option>
        </select>
      </div>
    </nav>
  )
}

export default Navbar
