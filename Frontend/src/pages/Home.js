import { Link } from "react-router-dom"
import { useTranslate } from "../hooks/useTranslate"

const Home = () => {
  const { t } = useTranslate()
  return (
    <section className="min-h-[calc(100vh-80px)] px-4 py-10 bg-slate-50">
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{t("appTitle")}</p>
          <h1 className="text-4xl font-bold text-slate-900">{t("home")}</h1>
          <p className="text-slate-600 leading-8">Order delicious meals from your favorite categories and track your order in real time.</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/menu" className="bg-slate-900 text-white px-6 py-3 rounded-md">{t("menu")}</Link>
            <Link to="/orders" className="border border-slate-300 px-6 py-3 rounded-md">{t("orderHistory")}</Link>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Food" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default Home
