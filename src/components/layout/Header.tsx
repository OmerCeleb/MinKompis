// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/shared';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import MobileMenu from '@/components/shared/MobileMenu';
import { useAuth } from '@/hooks';

export default function Header() {
    const t = useTranslations();
    const pathname = usePathname();

    const { user, isProvider, logout, loading } = useAuth();

    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showUserMenu && !(e.target as Element).closest('.user-menu')) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserMenu]);

    const handleLogout = async () => {
        await logout();
        setShowUserMenu(false);
    };

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.findServices') },
        { href: '/about', label: t('nav.about') },
    ];

    // Add provider-specific links
    if (user && isProvider) {
        navLinks.push({ href: '/dashboard', label: t('nav.dashboard') });
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105`}>
                            <span className="text-white text-lg font-bold">M</span>
                        </div>
                        <span className={`text-xl font-bold transition-colors ${
                            scrolled ? 'text-neutral-900' : 'text-white'
                        }`}>
              MinKompis
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href ||
                                (link.href !== '/' && pathname.startsWith(link.href));

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`font-medium transition-colors relative ${
                                        scrolled
                                            ? isActive
                                                ? 'text-primary-600'
                                                : 'text-neutral-700 hover:text-primary-600'
                                            : isActive
                                                ? 'text-white font-semibold'
                                                : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">

                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        {/* Auth Actions */}
                        {loading ? (
                            <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse"></div>
                        ) : user ? (
                            /* User Menu */
                            <div className="relative user-menu">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                                >
                                    <img
                                        src={user.avatar || 'https://i.pravatar.cc/150?img=1'}
                                        alt={user.firstName}
                                        className="w-10 h-10 rounded-full ring-2 ring-white shadow-md"
                                    />
                                    <div className="hidden lg:block text-left">
                                        <p className={`text-sm font-semibold ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className={`text-xs ${scrolled ? 'text-neutral-600' : 'text-white/80'}`}>
                                            {isProvider ? 'Provider' : 'Customer'}
                                        </p>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''} ${
                                            scrolled ? 'text-neutral-600' : 'text-white'
                                        }`}
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

                                        {isProvider && (
                                            <>
                                                <Link
                                                    href="/dashboard"
                                                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                        </svg>
                                                        {t('nav.dashboard')}
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/dashboard/bookings"
                                                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {t('nav.bookings')}
                                                    </div>
                                                </Link>
                                                <Link
                                                    href="/dashboard/messages"
                                                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                        {t('nav.messages')}
                                                    </div>
                                                </Link>
                                                <div className="border-t border-neutral-200 my-2"></div>
                                            </>
                                        )}

                                        {!isProvider && (
                                            <Link
                                                href="/customer/bookings"
                                                className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    My Bookings
                                                </div>
                                            </Link>
                                        )}

                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Settings
                                            </div>
                                        </Link>

                                        <div className="border-t border-neutral-200 my-2"></div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                {t('common.logout')}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Login/Register Buttons */
                            <div className="hidden md:flex items-center gap-3">
                                <Link href="/auth/login">
                                    <Button
                                        variant="outline"
                                        className={scrolled ? '' : 'border-white text-white hover:bg-white/10'}
                                    >
                                        {t('common.login')}
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button>
                                        {t('common.register')}
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu */}
                        <MobileMenu
                            navLinks={navLinks}
                            loginText={t('common.login')}
                            registerText={t('common.register')}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}