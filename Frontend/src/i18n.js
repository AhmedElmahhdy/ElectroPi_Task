import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./translations/en.json"
import ar from "./translations/ar.json"

const resources = {
  en: { translation: en },
  ar: { translation: ar },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("appLanguage") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

export default i18n
