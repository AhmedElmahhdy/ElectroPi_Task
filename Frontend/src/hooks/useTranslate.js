import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { AppContext } from "../context/AppContext"

export const useTranslate = () => {
  const { t, i18n } = useTranslation()
  const { language, setLanguage } = useContext(AppContext)

  const setLang = (lang) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  return { t, language, setLang }
}
