// src/app/[locale]/auth/register/provider/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useAuth, useToast } from '@/hooks';

export default function ProviderRegisterPage() {
    const t = useTranslations('auth.register');
    const tAuth = useTranslations('auth');
    const tCommon = useTranslations('common');
    const tCat = useTranslations('categories');
    const tToast = useTranslations('toast');
    const { register, loginWithBankID, loading } = useAuth();
    const { showToast } = useToast();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        languages: [] as string[],
        categories: [] as string[],
        bio: '',
        hourlyRate: 300
    });

    const availableLanguages = [
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'so', name: 'Soomaali', flag: '🇸🇴' }
    ];

    const categories = [
        { id: 'education', name: tCat('education'), icon: '📚' },
        { id: 'home', name: tCat('home'), icon: '🏠' },
        { id: 'official', name: tCat('official'), icon: '📋' },
        { id: 'health', name: tCat('health'), icon: '💪' },
        { id: 'business', name: tCat('business'), icon: '💼' },
        { id: 'creative', name: tCat('creative'), icon: '🎨' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const toggleLanguage = (code: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(code)
                ? prev.languages.filter(l => l !== code)
                : [...prev.languages, code]
        }));
    };

    const toggleCategory = (id: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(id)
                ? prev.categories.filter(c => c !== id)
                : [...prev.categories, id]
        }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
                showToast(tToast('auth.fillAllFields'), 'error');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                showToast(tToast('auth.passwordMismatch'), 'error');
                return;
            }
            if (formData.password.length < 6) {
                showToast(tAuth('passwordTooShort'), 'error');
                return;
            }
        }
        if (step === 2) {
            if (formData.languages.length === 0) {
                showToast(tToast('auth.selectLanguage'), 'warning');
                return;
            }
            if (formData.categories.length === 0) {
                showToast(tToast('auth.selectCategory'), 'warning');
                return;
            }
        }
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        if (!formData.bio || formData.bio.length < 50) {
            showToast(tToast('auth.addBio'), 'warning');
            return;
        }

        const result = await register({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'PROVIDER',
            phone: formData.phone,
            languages: formData.languages
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-primary-50/50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-primary-600 text-white p-6 sm:p-8">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <span className="text-white text-lg font-bold">M</span>
                            </div>
                            <span className="text-xl font-bold">{tCommon('appName')}</span>
                        </Link>

                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            {t('registerProvider')}
                        </h1>
                        <p className="text-blue-100">
                            {tAuth('joinPlatform')}
                        </p>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {[1, 2, 3].map(num => (
                                <div key={num} className="flex items-center">
                                    <div className={`relative flex items-center justify-center transition-all ${
                                        step >= num ? 'scale-110' : ''
                                    }`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                            step >= num
                                                ? 'bg-white text-blue-600 shadow-lg'
                                                : 'bg-white/20 text-white/60'
                                        }`}>
                                            {step > num ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : num}
                                        </div>
                                    </div>
                                    {num < 3 && (
                                        <div className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                                            step > num ? 'bg-white' : 'bg-white/20'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Step Labels */}
                        <div className="flex justify-between mt-3 px-2">
                            <span className={`text-xs sm:text-sm ${step >= 1 ? 'text-white font-medium' : 'text-white/60'}`}>
                                {t('step1Title')}
                            </span>
                            <span className={`text-xs sm:text-sm ${step >= 2 ? 'text-white font-medium' : 'text-white/60'}`}>
                                {t('step2Title')}
                            </span>
                            <span className={`text-xs sm:text-sm ${step >= 3 ? 'text-white font-medium' : 'text-white/60'}`}>
                                {t('step3Title')}
                            </span>
                        </div>
                    </div>

                    {/* BankID Option (Only Step 1) */}
                    {step === 1 && (
                        <div className="p-6 sm:p-8 border-b border-neutral-100">
                            <button
                                onClick={handleBankID}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-xl py-3.5 font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                                <span>{t('signUpBankID')}</span>
                                <span className="text-xs opacity-90">({tAuth('recommended')})</span>
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-neutral-600 text-sm">
                                        {t('orContinueWith')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        {/* Step 1: Basic Information */}
                        {step === 1 && (
                            <div className="space-y-6 max-w-2xl mx-auto">
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
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                    />
                                </div>

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

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('password')}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                    />
                                    <p className="mt-1.5 text-xs text-neutral-500">
                                        {tAuth('passwordTooShort')}
                                    </p>
                                </div>

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
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                    />
                                </div>

                                <Button
                                    onClick={handleNext}
                                    fullWidth
                                    size="lg"
                                    disabled={loading}
                                    className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all"
                                >
                                    {t('continue')}
                                </Button>
                            </div>
                        )}

                        {/* Step 2: Languages & Categories */}
                        {step === 2 && (
                            <div className="space-y-8 max-w-3xl mx-auto">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                        {t('languagesYouSpeak')}
                                    </h3>
                                    <p className="text-sm text-neutral-600 mb-4">
                                        {t('selectLanguages')}
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {availableLanguages.map(lang => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => toggleLanguage(lang.code)}
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                    formData.languages.includes(lang.code)
                                                        ? 'border-primary-500 bg-primary-50 shadow-md scale-105'
                                                        : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{lang.flag}</span>
                                                    <span className="font-medium text-neutral-900">{lang.name}</span>
                                                </div>
                                                {formData.languages.includes(lang.code) && (
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center gap-1 text-xs text-primary-600 font-medium">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                            {tCommon('selected')}
                                                        </span>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                        {t('serviceCategories')}
                                    </h3>
                                    <p className="text-sm text-neutral-600 mb-4">
                                        {t('selectCategories')}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => toggleCategory(cat.id)}
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                    formData.categories.includes(cat.id)
                                                        ? 'border-primary-500 bg-primary-50 shadow-md'
                                                        : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{cat.icon}</span>
                                                    <span className="font-medium text-neutral-900 text-sm">{cat.name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => setStep(1)}
                                        variant="outline"
                                        fullWidth
                                        disabled={loading}
                                        className="border-2 border-neutral-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                                    >
                                        {t('back')}
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        fullWidth
                                        disabled={loading}
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {t('continue')}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Bio & Hourly Rate */}
                        {step === 3 && (
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('bio')}
                                    </label>
                                    <p className="text-xs text-neutral-500 mb-2">
                                        Minimum 50 characters
                                    </p>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={6}
                                        placeholder={t('bioPlaceholder')}
                                        disabled={loading}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 resize-none transition-all"
                                    />
                                    <p className="mt-1.5 text-xs text-neutral-500 text-right">
                                        {formData.bio.length} characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('hourlyRate')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            value={formData.hourlyRate}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder={t('hourlyRatePlaceholder')}
                                            disabled={loading}
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 pr-16 transition-all"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                                            SEK/h
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => setStep(2)}
                                        variant="outline"
                                        fullWidth
                                        disabled={loading}
                                        className="border-2 border-neutral-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                                    >
                                        {t('back')}
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        fullWidth
                                        size="lg"
                                        disabled={loading}
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {loading ? t('creatingAccount') : t('createAccount')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-neutral-200 bg-gradient-to-b from-white to-neutral-50/50 text-center">
                        <p className="text-sm text-neutral-600">
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