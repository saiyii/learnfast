import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../locales/${locale}.json`)).default,
}));
