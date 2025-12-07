// src/app/[locale]/layout.tsx
'use client';

import { NextIntlClientProvider } from 'next-intl';
import { notFound, usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/shared/ToastContainer';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'sv', 'tr'];

export default function RootLayout({
                                       children,
                                       params: { locale }
                                   }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const pathname = usePathname();

    // Validate locale
    if (!locales.includes(locale)) {
        notFound();
    }

    // Check if we're on customer or dashboard pages
    const isCustomerPage = pathname?.includes('/customer');
    const isDashboardPage = pathname?.includes('/dashboard');
    const hideHeaderFooter = isCustomerPage || isDashboardPage;

    let messages;
    try {
        messages = require(`../../../messages/${locale}.json`);
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ToastProvider>
                <ErrorBoundary>
                    <div className="min-h-screen flex flex-col">
                        {!hideHeaderFooter && <Header />}
                        <main className="flex-1">
                            {children}
                        </main>
                        {!hideHeaderFooter && <Footer />}
                    </div>
                    <ToastContainer />
                </ErrorBoundary>
            </ToastProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}