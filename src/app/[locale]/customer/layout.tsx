// src/app/[locale]/customer/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import PageLoader from '@/components/shared/PageLoader';

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
                            {/* Logo & Mobile Menu Button */}
                            <div className="flex items-center gap-4">
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>

                                {/* Logo */}
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-lg font-bold">M</span>
                                    </div>
                                    <span className="text-xl font-bold text-neutral-900 hidden sm:block">
                                        {tCommon('appName')}
                                    </span>
                                </Link>
                            </div>

                            {/* User Menu */}
                            <div className="flex items-center gap-4">
                                {/* Find Services Button */}
                                <Link
                                    href="/services"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="font-medium">{t('findServices')}</span>
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative user-menu">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
                                    >
                                        <img
                                            src={user.avatar || 'https://i.pravatar.cc/150?img=68'}
                                            alt={user.firstName}
                                            className="w-9 h-9 rounded-full border-2 border-neutral-200"
                                        />
                                        <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 py-2">
                                            <div className="px-4 py-3 border-b border-neutral-200">
                                                <p className="font-semibold text-neutral-900">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-sm text-neutral-600">{user.email}</p>
                                                <p className="text-xs text-neutral-500 mt-1">{t('customerAccount')}</p>
                                            </div>
                                            <Link
                                                href="/customer/settings"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-neutral-700">{t('settings')}</span>
                                            </Link>
                                            <Link
                                                href="/"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <span className="text-neutral-700">Home</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors text-left border-t border-neutral-200 mt-2 pt-2"
                                            >
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span className="text-red-600">{tCommon('logout')}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Layout */}
                <div className="flex">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden md:flex md:flex-shrink-0">
                        <div className="flex flex-col w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)]">
                            <nav className="flex-1 px-3 py-4 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                                isActive
                                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                                            }`}
                                        >
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Mobile Sidebar */}
                    {showMobileMenu && (
                        <>
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                                onClick={() => setShowMobileMenu(false)}
                            />
                            <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 md:hidden shadow-xl">
                                <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                                    <span className="font-bold text-lg">{tCommon('appName')}</span>
                                    <button
                                        onClick={() => setShowMobileMenu(false)}
                                        className="p-2 hover:bg-neutral-100 rounded-lg"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="p-3 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setShowMobileMenu(false)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                                    isActive
                                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                                        : 'text-neutral-700 hover:bg-neutral-50'
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

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
                    <div className="grid grid-cols-4 gap-1">
                        {navigation.slice(0, 4).map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center py-2 px-1 ${
                                        isActive ? 'text-primary-600' : 'text-neutral-600'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="text-xs mt-1 truncate w-full text-center">
                                        {item.name.split(' ')[0]}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
}