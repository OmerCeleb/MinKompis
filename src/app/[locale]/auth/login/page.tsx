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

    const { login, loginWithBankID, loading } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors = {
            email: '',
            password: ''
        };

        if (!formData.email) {
            newErrors.email = t('emailRequired');
        } else if (!validateEmail(formData.email)) {
            newErrors.email = t('emailInvalid');
        }

        if (!formData.password) {
            newErrors.password = t('passwordRequired');
        } else if (formData.password.length < 6) {
            newErrors.password = t('passwordTooShort');
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData);

        if (result.success) {
            showToast(t('loginSuccess'), 'success');
        } else {
            showToast(result.error || t('loginFailed'), 'error');
        }
    };

    const handleBankID = async () => {
        const result = await loginWithBankID();
        if (!result.success) {
            showToast(t('bankIdNotAvailable'), 'info');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Branding & Info (Hidden on mobile) */}
                <div className="hidden lg:block">
                    <div className="space-y-8">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <span className="text-white text-2xl font-bold">M</span>
                            </div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                                {tCommon('appName')}
                            </span>
                        </Link>

                        {/* Hero Text */}
                        <div className="space-y-4">
                            <h1 className="text-4xl xl:text-5xl font-bold text-neutral-900 leading-tight">
                                {t('welcomeBackHero')}
                            </h1>
                            <p className="text-lg text-neutral-600">
                                {t('welcomeBackSubtitle')}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 mb-1">
                                        {t('customerBenefit1')}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        {t('customerDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 mb-1">
                                        {t('customerBenefit2')}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        {t('findServicesInLanguage')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full">
                    <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-neutral-100 p-6 sm:p-8 lg:p-10">

                        {/* Mobile Logo (Visible only on mobile) */}
                        <div className="lg:hidden text-center mb-8">
                            <Link href="/" className="inline-flex items-center gap-2.5">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xl font-bold">M</span>
                                </div>
                                <span className="text-2xl font-bold text-neutral-900">{tCommon('appName')}</span>
                            </Link>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                                {t('loginTitle')}
                            </h2>
                            <p className="text-neutral-600">
                                {t('welcomeBack')}
                            </p>
                        </div>

                        {/* BankID Login (Primary) */}
                        <button
                            onClick={handleBankID}
                            disabled={loading}
                            className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3.5 sm:py-4 font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            <span>{t('loginBankID')}</span>
                            <span className="text-xs opacity-90">({t('recommended')})</span>
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-neutral-600 text-sm">
                                    {t('orLoginWith')}
                                </span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 ${
                                        errors.email ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 pr-12 ${
                                            errors.password ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-sm text-neutral-600">{t('rememberMe')}</span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                                >
                                    {t('forgotPassword')}
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                disabled={loading}
                                className="font-semibold h-12 sm:h-13"
                            >
                                {loading ? t('loggingIn') : t('loginButton')}
                            </Button>
                        </form>

                        {/* Register Link */}
                        <p className="mt-6 text-center text-sm text-neutral-600">
                            {t('noAccount')}{' '}
                            <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                                {t('register.title')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}