import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';

const language = localStorage.getItem('i18nextLng') || 'en-US';

i18n
  .use(initReactI18next)
  .use(backend)
  .init({
    lng: language,
    ns: ['translations'],
    defaultNS: 'translations',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    backend: {
      loadPath: '/static/locales/{{lng}}/{{ns}}.json',
    },
  });

i18n.on('languageChanged', language =>
  localStorage.setItem('i18nextLng', language)
);

export default i18n;
