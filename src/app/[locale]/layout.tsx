// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/contexts/ToastContext';
import ToastContainer from '@/components/shared/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'MinKompis - Find Services in Your Language',
    description: 'Connect with verified service providers who speak your language in Sweden',
};

const locales = ['en', 'sv', 'tr', 'ar'];

export default async function RootLayout({
                                             children,
                                             params: { locale }
                                         }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validate locale
    if (!locales.includes(locale)) {
        notFound();
    }

    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ToastProvider>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
                <ToastContainer />
            </ToastProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}