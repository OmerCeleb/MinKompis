// src/app/[locale]/customer/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks';

export default function CustomerLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('customer');
    const tCommon = useTranslations('common');
    const { user, loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        }
        if (!loading && user?.role === 'PROVIDER') {
            router.push('/dashboard');
        }
    }, [loading, isAuthenticated, user, router]);

    if (loading || !user || user.role !== 'CUSTOMER') {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-neutral-600">{tCommon('loading')}</p>
                </div>
            </div>
        );
    }

    const navigation = [
        {
            name: t('overview'),
            href: '/customer/overview',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: t('myBookings'),
            href: '/customer/bookings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            name: t('favorites'),
            href: '/customer/favorites',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
        },
        {
            name: t('myMessages'),
            href: '/customer/messages',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            name: t('myReviews'),
            href: '/customer/reviews',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
        },
        {
            name: t('settings'),
            href: '/customer/settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + '/');
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-6">

                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
                                <img
                                    src={user.avatar || 'https://i.pravatar.cc/150?img=68'}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-neutral-900 truncate">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    <p className="text-sm text-neutral-500">{t('customerAccount')}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {navigation.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                                active
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                            }`}
                                        >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Quick Action */}
                            <div className="mt-6 pt-6 border-t border-neutral-200">
                                <Link
                                    href="/services"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {t('findServices')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}