// src/app/[locale]/auth/register/provider/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useAuth, useToast } from '@/hooks';

export default function ProviderRegisterPage() {
    const t = useTranslations('auth.register');
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
        // Validate current step
        if (step === 1) {
            if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
                showToast(tToast('auth.fillAllFields'), 'error');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                showToast(tToast('auth.passwordMismatch'), 'error');
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
        if (!formData.bio) {
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
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4 py-12">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 w-full max-w-2xl">

                {/* Header */}
                <div className="text-center p-8 border-b border-neutral-200">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl font-bold">M</span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                        {t('registerProvider')}
                    </h1>
                    <p className="text-sm text-neutral-600">
                        Join our platform and start earning
                    </p>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {[1, 2, 3].map(num => (
                            <div key={num} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                    step >= num
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-200 text-neutral-600'
                                }`}>
                                    {num}
                                </div>
                                {num < 3 && (
                                    <div className={`w-12 h-1 mx-1 transition-colors ${
                                        step > num ? 'bg-primary-600' : 'bg-neutral-200'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* BankID Option (Step 1) */}
                {step === 1 && (
                    <div className="p-8 border-b border-neutral-200">
                        <button
                            onClick={handleBankID}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            {t('signUpBankID')}
                        </button>
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-neutral-600">{t('orContinueWith')}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step Content */}
                <div className="p-8">
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-neutral-900 mb-4">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
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
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
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
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
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
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
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
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
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
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
                                />
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
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100"
                                />
                            </div>

                            <Button
                                onClick={handleNext}
                                fullWidth
                                disabled={loading}
                                className="mt-6"
                            >
                                {t('continue')}
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Languages & Categories */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-neutral-900">
                                Languages & Services
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-3">
                                    Languages you speak
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableLanguages.map(lang => (
                                        <button
                                            key={lang.code}
                                            type="button"
                                            onClick={() => toggleLanguage(lang.code)}
                                            className={`p-3 rounded-lg border-2 transition-all ${
                                                formData.languages.includes(lang.code)
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-neutral-200 hover:border-neutral-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{lang.flag}</span>
                                                <span className="font-medium text-neutral-900">{lang.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-3">
                                    Service categories
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`p-3 rounded-lg border-2 transition-all ${
                                                formData.categories.includes(cat.id)
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-neutral-200 hover:border-neutral-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{cat.icon}</span>
                                                <span className="font-medium text-neutral-900">{cat.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    fullWidth
                                >
                                    {tCommon('back')}
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    fullWidth
                                >
                                    {t('continue')}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Profile Details */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-neutral-900">
                                Profile Details
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    About yourself
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us about your experience and what services you offer..."
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    Hourly rate (SEK)
                                </label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleChange}
                                    min="0"
                                    step="50"
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setStep(2)}
                                    variant="outline"
                                    fullWidth
                                >
                                    {tCommon('back')}
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? t('creatingAccount') : t('createAccount')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Login Link */}
                <div className="p-6 border-t border-neutral-200 text-center">
                    <p className="text-sm text-neutral-600">
                        {t('hasAccount')}{' '}
                        <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                            {t('logIn')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}