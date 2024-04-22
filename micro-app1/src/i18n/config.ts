import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from './en/translation_en.json';
import translation_de from './de/translation_de.json';

i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation:translation_en
        },
        de: {
            translation:translation_de,
        },
    },
});
export default i18next;
