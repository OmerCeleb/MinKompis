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
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData);

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
                                MinKompis
                            </span>
                        </Link>

                        {/* Hero Text */}
                        <div className="space-y-4">
                            <h1 className="text-4xl xl:text-5xl font-bold text-neutral-900 leading-tight">
                                Welcome back to your trusted service marketplace
                            </h1>
                            <p className="text-lg text-neutral-600">
                                Connect with verified professionals in your own language. Your next helper is just a click away.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">Verified Providers</h3>
                                    <p className="text-sm text-neutral-600">All service providers are verified and trusted</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">Multilingual Support</h3>
                                    <p className="text-sm text-neutral-600">Find services in your preferred language</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">Secure Payments</h3>
                                    <p className="text-sm text-neutral-600">Safe and encrypted payment processing</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                            <div>
                                <div className="text-3xl font-bold text-primary-600">500+</div>
                                <div className="text-sm text-neutral-600">Providers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">15+</div>
                                <div className="text-sm text-neutral-600">Languages</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">4.9</div>
                                <div className="text-sm text-neutral-600">Rating</div>
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
                                <span className="text-2xl font-bold text-neutral-900">MinKompis</span>
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
                            <span>{t('loginWith')} BankID</span>
                            <span className="text-xs bg-blue-800 px-2 py-0.5 rounded-full">{t('recommended')}</span>
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-neutral-500 font-medium">
                                    {t('orContinueWith')}
                                </span>
                            </div>
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
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 disabled:cursor-not-allowed ${
                                        errors.email ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                                    {t('password')}
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100 disabled:cursor-not-allowed ${
                                            errors.password ? 'border-red-500' : 'border-neutral-300'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
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
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t('signingIn')}
                                    </div>
                                ) : (
                                    tCommon('login')
                                )}
                            </Button>
                        </form>

                        {/* Register Link */}
                        <p className="mt-6 text-center text-sm text-neutral-600">
                            {t('noAccount')}{' '}
                            <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                                {tCommon('register')}
                            </Link>
                        </p>

                        {/* Mobile Stats (Visible only on mobile) */}
                        <div className="lg:hidden mt-8 pt-6 border-t border-neutral-200">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary-600">500+</div>
                                    <div className="text-xs text-neutral-600">Providers</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary-600">15+</div>
                                    <div className="text-xs text-neutral-600">Languages</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary-600">4.9</div>
                                    <div className="text-xs text-neutral-600">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}