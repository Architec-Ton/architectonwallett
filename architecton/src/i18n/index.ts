import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ru from './ru.json';
import zh from './zh.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  zh: {
    translation: zh,
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  lng: 'en',
  debug: false,
  fallbackLng: 'en',
});

export default i18n;
