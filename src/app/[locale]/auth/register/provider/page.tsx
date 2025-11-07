// src/app/[locale]/auth/register/provider/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useAuth } from '@/hooks';

export default function ProviderRegisterPage() {
    const t = useTranslations('auth');
    const tCommon = useTranslations('common');

    const { register, loginWithBankID, loading, error } = useAuth();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Step 2: Service Details
        languages: [] as string[],
        categories: [] as string[],

        // Step 3: Profile
        bio: '',
        profilePhoto: null as File | null
    });

    const availableLanguages = [
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];

    const categories = [
        { id: 'education', name: 'Education & Tutoring', icon: '📚' },
        { id: 'home', name: 'Home Services', icon: '🏠' },
        { id: 'official', name: 'Official Procedures', icon: '📋' },
        { id: 'health', name: 'Health & Fitness', icon: '💪' },
        { id: 'business', name: 'Business Services', icon: '💼' },
        { id: 'creative', name: 'Creative Services', icon: '🎨' }
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
                alert('Please fill in all required fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
        }
        if (step === 2) {
            if (formData.languages.length === 0) {
                alert('Please select at least one language');
                return;
            }
            if (formData.categories.length === 0) {
                alert('Please select at least one category');
                return;
            }
        }
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        if (!formData.bio) {
            alert('Please add a bio about yourself');
            return;
        }

        await register({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'PROVIDER',
            phone: formData.phone,
            languages: formData.languages
        });
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
                                    <div className={`w-12 h-0.5 mx-1 ${step > num ? 'bg-primary-600' : 'bg-neutral-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-neutral-600 mt-2">
                        {step === 1 && t('step1Title')}
                        {step === 2 && t('step2Title')}
                        {step === 3 && t('step3Title')}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="p-8 space-y-4">
                        <button
                            onClick={handleBankID}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Register with BankID
                        </button>

                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-neutral-200"></div>
                            <span className="px-3 text-xs text-neutral-500">or with email</span>
                            <div className="flex-1 h-px bg-neutral-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder={t('firstName')}
                                required
                                disabled={loading}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder={t('lastName')}
                                required
                                disabled={loading}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('email')}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                        />

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('phone')}
                            disabled={loading}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t('password')}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder={t('confirmPassword')}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-neutral-100"
                        />

                        <Button onClick={handleNext} fullWidth disabled={loading}>
                            {tCommon('continue')} →
                        </Button>
                    </div>
                )}

                {/* Step 2: Service Details */}
                {step === 2 && (
                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-3">
                                {t('languagesYouSpeak')} *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
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
                                        <span className="text-2xl">{lang.flag}</span>
                                        <span className="ml-2 font-medium">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-3">
                                {t('primaryCategory')} *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                                            formData.categories.includes(cat.id)
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <span className="text-xl">{cat.icon}</span>
                                        <span className="ml-2 text-sm font-medium">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setStep(1)} fullWidth>
                                ← {tCommon('back')}
                            </Button>
                            <Button onClick={handleNext} fullWidth>
                                {tCommon('continue')} →
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Profile & Bio */}
                {step === 3 && (
                    <div className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('aboutYou')} *
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder={t('aboutYouPlaceholder')}
                                rows={6}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                            />
                            <p className="text-xs text-neutral-500 mt-2">
                                {formData.bio.length}/500 {t('characterCount')}
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                                {t('completeProfileTitle')}
                            </p>
                            <p className="text-sm text-blue-800">
                                {t('completeProfileDesc')}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setStep(2)} fullWidth disabled={loading}>
                                ← {tCommon('back')}
                            </Button>
                            <Button onClick={handleSubmit} fullWidth disabled={loading}>
                                {loading ? t('creatingAccount') : t('createAccount')}
                            </Button>
                        </div>
                    </div>
                )}

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