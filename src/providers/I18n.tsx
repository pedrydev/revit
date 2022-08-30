import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import Spinner from '@/common/feedback/Spinner';

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: import.meta.env.DEV,
    detection: {
      lookupLocalStorage: 'lang',
      lookupQuerystring: 'lang',
      order: ['querystring', 'localStorage', 'htmlTag'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
  });

export default function I18n({ children }: PropsWithChildren<unknown>) {
  return (
    <Suspense fallback={<Spinner variant='page' />}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
}
