import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as enUS from "./en-US";
import * as ptBR from "./pt-BR";

i18n.use(initReactI18next).init({
  resources: {
    en: enUS,
    "pt-BR": ptBR,
  },
  lng: localStorage.getItem("language") || "pt-BR",
  fallbackLng: localStorage.getItem("language") || "pt-BR",
  interpolation: {
    escapeValue: false,
  },
});
