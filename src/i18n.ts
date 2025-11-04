// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'sv', 'tr'] as const;
export const defaultLocale = 'tr' as const; // ← YENİ: Default locale export
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as Locale)) notFound();

    return {
        locale, // ← YENİ: locale'i return et
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});