// src/app/[locale]/auth/register/customer/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useAuth, useToast } from '@/hooks';

export default function CustomerRegisterPage() {
    const t = useTranslations('auth.register');
    const tAuth = useTranslations('auth');
    const tCommon = useTranslations('common');
    const tToast = useTranslations('toast');
    const { register, loginWithBankID, loading } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors when typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.email) {
            newErrors.email = tAuth('emailRequired');
        } else if (!validateEmail(formData.email)) {
            newErrors.email = tAuth('emailInvalid');
        }

        if (!formData.password) {
            newErrors.password = tAuth('passwordRequired');
        } else if (formData.password.length < 6) {
            newErrors.password = tAuth('passwordTooShort');
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = tToast('auth.passwordMismatch');
        }

        if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
            setErrors(newErrors);
            return;
        }

        const result = await register({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'CUSTOMER',
            phone: formData.phone
        });

        if (!result.success) {
            showToast(result.error || tToast('auth.registerError'), 'error');
        } else {
            showToast(tToast('auth.registerSuccess'), 'success');
        }
    };

    const handleBankID = async () => {
        await loginWithBankID();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
                                {tAuth('findServicesInLanguage')}
                            </h1>
                            <p className="text-lg text-neutral-600">
                                {tAuth('customerDesc')}
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
                                        {tAuth('customerBenefit1')}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        Quick and simple booking process
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
                                        {tAuth('customerBenefit2')}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        Protected payments and verified providers
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900 mb-1">
                                        Multilingual Support
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        Communicate in your preferred language
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
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
                                {t('registerCustomer')}
                            </h2>
                            <p className="text-neutral-600">
                                {tAuth('findServicesInLanguage')}
                            </p>
                        </div>

                        {/* BankID Option */}
                        <button
                            onClick={handleBankID}
                            disabled={loading}
                            className="w-full mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-xl py-3.5 sm:py-4 font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            <span>{t('signUpBankID')}</span>
                            <span className="text-xs opacity-90">({tAuth('recommended')})</span>
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white text-neutral-600 text-sm">
                                    {t('orContinueWith')}
                                </span>
                            </div>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('firstName')}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('lastName')}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                    />
                                </div>
                            </div>

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
                                    required
                                    disabled={loading}
                                    placeholder="you@example.com"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all ${
                                        errors.email ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+46 70 123 4567"
                                    disabled={loading}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                />
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
                                        required
                                        disabled={loading}
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 pr-12 transition-all ${
                                            errors.password ? 'border-red-500' : 'border-neutral-300'
                                        }`}
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

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('confirmPassword')}
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-neutral-300'
                                    }`}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                disabled={loading}
                                className="mt-6 font-semibold"
                            >
                                {loading ? t('creatingAccount') : t('createAccount')}
                            </Button>
                        </form>

                        {/* Login Link */}
                        <p className="mt-6 text-center text-sm text-neutral-600">
                            {t('hasAccount')}{' '}
                            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                                {t('logIn')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}