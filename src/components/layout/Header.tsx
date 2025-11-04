// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@/components/shared';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import MobileMenu from '@/components/shared/MobileMenu';

export default function Header() {
    const t = useTranslations();
    const [scrolled, setScrolled] = useState(false);

    // Geçici mock - gerçekte auth state'den gelecek
    const isLoggedIn = true;
    const isProvider = true;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.findServices') },
        { href: '/about', label: t('nav.about') },
    ];

    // Provider için ekstra link
    if (isLoggedIn && isProvider) {
        navLinks.push({ href: '/dashboard', label: t('nav.dashboard') });
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white shadow-md'
                    : 'bg-white/95 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                                <span className="text-white text-base font-bold">M</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
              MinKompis
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 rounded-lg transition-colors group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-600 group-hover:w-3/4 transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <LanguageSwitcher />

                        <div className="h-8 w-px bg-neutral-200"></div>

                        {isLoggedIn && isProvider ? (
                            <>
                                {/* Provider Menu */}
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        {t('nav.dashboard')}
                                    </Button>
                                </Link>

                                {/* User Avatar/Dropdown */}
                                <div className="relative">
                                    <button className="flex items-center gap-2 p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                                        <img
                                            src="https://i.pravatar.cc/150?img=1"
                                            alt="User"
                                            className="w-8 h-8 rounded-full ring-2 ring-primary-100"
                                        />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Guest Menu */}
                                <Link href="/auth/login">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        {t('common.login')}
                                    </Button>
                                </Link>

                                <Link href="/auth/register/provider">
                                    <Button variant="primary" size="sm" className="font-medium shadow-sm hover:shadow">
                                        {t('nav.becomeProvider')}
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
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