import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import pt from '../../locales/pt.json'
import en from '../../locales/en.json'

const STORAGE_KEY = 'portfolio-locale'

const saved = localStorage.getItem(STORAGE_KEY)
if (saved === 'pt' || saved === 'en') {
  i18n.use({
    type: 'languageDetector',
    detect: () => saved,
  })
} else {
  i18n.use(LanguageDetector)
}

void i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  fallbackLng: 'en',
  supportedLngs: ['pt', 'en'],
  detection: {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: STORAGE_KEY,
    caches: ['localStorage'],
    convertDetectedLanguage: (lng: string) => (lng.startsWith('pt') ? 'pt' : 'en'),
  },
  interpolation: { escapeValue: false },
})

export function setLocale(locale: 'pt' | 'en') {
  localStorage.setItem(STORAGE_KEY, locale)
  void i18n.changeLanguage(locale)
}

export default i18n
