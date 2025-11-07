// src/app/[locale]/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useAuth, useToast } from '@/hooks';

export default function LoginPage() {
    const t = useTranslations('auth');
    const tCommon = useTranslations('common');

    const { login, loginWithBankID, loading, error } = useAuth();
    const { showToast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login({ email, password });

        if (result.success) {
            showToast('Welcome back! 🎉', 'success');
        } else {
            showToast(result.error || 'Login failed', 'error');
        }
    };

    const handleBankID = async () => {
        const result = await loginWithBankID();
        if (!result.success) {
            showToast('BankID login not available yet', 'info');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100 w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl font-bold">M</span>
                        </div>
                        <span className="text-2xl font-bold text-neutral-900">MinKompis</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        {t('loginTitle')}
                    </h1>
                    <p className="text-neutral-600">
                        {t('welcomeBack')}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* BankID Login (Primary) */}
                <button
                    onClick={handleBankID}
                    disabled={loading}
                    className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>{t('loginWith')} BankID</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t('recommended')}</span>
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-neutral-200"></div>
                    <span className="px-4 text-sm text-neutral-500">{t('orContinueWith')}</span>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('email')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 disabled:cursor-not-allowed"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('password')}
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-neutral-600">{t('rememberMe')}</span>
                        </label>
                        <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        disabled={loading}
                        className="font-semibold"
                    >
                        {loading ? t('signingIn') : tCommon('login')}
                    </Button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-neutral-600">
                    {t('noAccount')}{' '}
                    <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                        {tCommon('register')}
                    </Link>
                </p>
            </div>
        </div>
    );
}