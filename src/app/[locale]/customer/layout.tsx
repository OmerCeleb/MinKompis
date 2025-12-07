// src/app/[locale]/customer/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import PageLoader from '@/components/shared/PageLoader';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function CustomerLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('customer');
    const tCommon = useTranslations('common');
    const { user, loading, isAuthenticated, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        }
        if (!loading && user?.role === 'PROVIDER') {
            router.push('/dashboard');
        }
    }, [loading, isAuthenticated, user, router]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showUserMenu && !(e.target as Element).closest('.user-menu')) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    if (loading || !user || user.role !== 'CUSTOMER') {
        return <PageLoader message={tCommon('loading')} />;
    }

    const navigation = [
        {
            name: t('overview'),
            href: '/customer/overview',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
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
            name: t('favorites.title'),
            href: '/customer/favorites',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            name: t('myMessages'),
            href: '/customer/messages',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            )
        },
        {
            name: t('myReviews'),
            href: '/customer/reviews',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
        {
            name: t('settings'),
            href: '/customer/settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    const handleLogout = async () => {
        await logout();
        setShowUserMenu(false);
    };

    return (
        <>
            {/* Ana Header'ı Gizle */}
            <style jsx global>{`
                body > div > div > header { display: none !important; }
                body > div > div > footer { display: none !important; }
            `}</style>

            <div className="min-h-screen bg-neutral-50">
                {/* Top Header - Mobile & Desktop */}
                <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Left: Logo & Mobile Menu */}
                            <div className="flex items-center gap-4">
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                                >
                                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showMobileMenu ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>

                                {/* Logo */}
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">M</span>
                                    </div>
                                    <span className="text-xl font-bold text-neutral-900 hidden sm:block">
                                        MinKompis
                                    </span>
                                </Link>
                            </div>

                            {/* Right: Language Switcher & User Menu */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Language Switcher */}
                                <LanguageSwitcher />

                                {/* User Menu */}
                                <div className="relative user-menu">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <p className="font-semibold text-neutral-900 text-sm">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-neutral-600">
                                                {t('customerRole')}
                                            </p>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-neutral-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 animate-fade-in">
                                            <div className="px-4 py-3 border-b border-neutral-200">
                                                <p className="font-semibold text-neutral-900">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-sm text-neutral-600">{user.email}</p>
                                            </div>

                                            <Link
                                                href="/customer/settings"
                                                className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{t('settings')}</span>
                                                </div>
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>{tCommon('logout')}</span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {showMobileMenu && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                                onClick={() => setShowMobileMenu(false)}
                            />
                            <div className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
                                <nav className="p-4 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setShowMobileMenu(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                                    isActive
                                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                                        : 'text-neutral-700 hover:bg-neutral-100'
                                                }`}
                                            >
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </>
                    )}
                </header>

                {/* Main Layout - Desktop Sidebar + Content */}
                <div className="flex">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] sticky top-16">
                        <nav className="p-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            isActive
                                                ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                                                : 'text-neutral-700 hover:bg-neutral-100'
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}