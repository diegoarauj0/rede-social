import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import enTranslations from "../locale/en.json"
import ptTranslations from "../locale/pt.json"

i18n
.use(detector)
.use(initReactI18next).init({
  resources: {
    en: { ...enTranslations },
    pt: { ...ptTranslations },
  },

  fallbackLng: "en",
})

export default i18n
