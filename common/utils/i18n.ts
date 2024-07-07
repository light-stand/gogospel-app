import { getLocales } from "expo-localization";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "@/assets/locales/en.json";
import es from "@/assets/locales/es.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: { en, es },
  fallbackLng: "en",
  lng: getLocales()[0].languageCode as string,
  interpolation: {
    escapeValue: false,
  },
});
