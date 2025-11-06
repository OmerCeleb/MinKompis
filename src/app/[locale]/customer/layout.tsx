// src/app/[locale]/customer/layout.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
    const t = useTranslations('customer');
    const pathname = usePathname();

    const navigation = [
        {
            name: t('myBookings'),
            href: '/customer/bookings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            name: t('myMessages'),
            href: '/customer/messages',
            badge: 2,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        {
            name: t('favorites'),
            href: '/customer/favorites',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            name: t('mySettings'),
            href: '/customer/settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    const isActive = (href: string) => pathname.includes(href);

    return (
        <div className="min-h-screen bg-neutral-50 pt-16">
            <div className="flex">

                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen fixed left-0 top-16">
                    <div className="p-6">

                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200">
                            <img
                                src="https://i.pravatar.cc/150?img=25"
                                alt="Customer"
                                className="w-12 h-12 rounded-full ring-2 ring-primary-100"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 truncate">John Doe</h3>
                                <p className="text-sm text-neutral-500 truncate">{t('customerAccount')}</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive(item.href)
                                            ? 'bg-primary-50 text-primary-700 font-medium'
                                            : 'text-neutral-700 hover:bg-neutral-50'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="flex-1">{item.name}</span>
                                    {item.badge && (
                                        <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>

                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}
