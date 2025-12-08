// src/app/[locale]/auth/register/provider/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { AdvancedImageUpload } from '@/components/shared';
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
        hourlyRate: 300,
        avatar: '' // YENI: Avatar URL
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

    const handleAvatarUpload = (url: string) => {
        setFormData(prev => ({ ...prev, avatar: url }));
        showToast(t('profilePhotoUploaded'), 'success');
    };

    const validateStep1 = () => {
        if (!formData.email || !formData.firstName || !formData.lastName) {
            showToast(tToast('auth.fillAllFields'), 'error');
            return false;
        }
        if (formData.password.length < 6) {
            showToast(tToast('auth.passwordTooShort'), 'error');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            showToast(tToast('auth.passwordMismatch'), 'error');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (formData.languages.length === 0) {
            showToast(tToast('auth.selectLanguage'), 'error');
            return false;
        }
        if (formData.categories.length === 0) {
            showToast(tToast('auth.selectCategory'), 'error');
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        if (formData.bio.length < 50) {
            showToast(tToast('auth.addBio'), 'error');
            return false;
        }
        if (!formData.hourlyRate || formData.hourlyRate < 100) {
            showToast('Please enter a valid hourly rate', 'error');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep3()) return;

        const result = await register({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: 'PROVIDER',
            phone: formData.phone,
            languages: formData.languages
        });

        if (result.success) {
            showToast(tToast('auth.registerSuccess'), 'success');
        } else {
            showToast(result.error || tToast('auth.registerError'), 'error');
        }
    };

    const handleBankIDRegister = async () => {
        const result = await loginWithBankID();
        if (!result.success) {
            showToast(result.error || tAuth('bankIdNotAvailable'), 'error');
        }
    };

    const progressPercentage = (step / 3) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
            <div className="container-custom py-8 sm:py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-block text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-4"
                    >
                        {tCommon('appName')}
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                        {t('registerProvider')}
                    </h1>
                    <p className="text-neutral-600">{t('joinPlatform')}</p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-3 text-sm">
                            <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
                                {t('step1Title')}
                            </span>
                            <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
                                {t('step2Title')}
                            </span>
                            <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-neutral-400'}>
                                {t('step3Title')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 sm:p-8 lg:p-10">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Account Info */}
                            {step === 1 && (
                                <div className="space-y-6 max-w-2xl mx-auto">
                                    <div className="grid sm:grid-cols-2 gap-4">
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
                                            placeholder="+46 XX XXX XX XX"
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
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
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
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-100 transition-all"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="button"
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

                            {/* Step 2: Languages & Categories */}
                            {step === 2 && (
                                <div className="space-y-6 max-w-2xl mx-auto">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                                            {t('languagesYouSpeak')}
                                        </label>
                                        <p className="text-xs text-neutral-500 mb-3">{t('selectLanguages')}</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {availableLanguages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    type="button"
                                                    onClick={() => toggleLanguage(lang.code)}
                                                    disabled={loading}
                                                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                        formData.languages.includes(lang.code)
                                                            ? 'border-primary-500 bg-primary-50'
                                                            : 'border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                                >
                                                    <div className="text-2xl mb-1">{lang.flag}</div>
                                                    <div className="text-sm font-medium text-neutral-900">{lang.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                                            {t('serviceCategories')}
                                        </label>
                                        <p className="text-xs text-neutral-500 mb-3">{t('selectCategories')}</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.id)}
                                                    disabled={loading}
                                                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                        formData.categories.includes(cat.id)
                                                            ? 'border-primary-500 bg-primary-50'
                                                            : 'border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                                >
                                                    <div className="text-2xl mb-1">{cat.icon}</div>
                                                    <div className="text-sm font-medium text-neutral-900">{cat.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="button"
                                            onClick={handleBack}
                                            variant="outline"
                                            fullWidth
                                            disabled={loading}
                                        >
                                            {t('back')}
                                        </Button>
                                        <Button
                                            type="button"
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

                            {/* Step 3: Bio, Avatar & Hourly Rate */}
                            {step === 3 && (
                                <div className="space-y-6 max-w-2xl mx-auto">
                                    {/* YENI: Avatar Upload */}
                                    <div>
                                        <AdvancedImageUpload
                                            currentImage={formData.avatar}
                                            onUploadComplete={handleAvatarUpload}
                                            uploadType="avatar"
                                            label={t('profilePhoto')}
                                            description={t('profilePhotoDesc')}
                                            shape="circle"
                                            size="xl"
                                            autoUpload={true}
                                        />
                                    </div>

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
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                                SEK/hr
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="button"
                                            onClick={handleBack}
                                            variant="outline"
                                            fullWidth
                                            disabled={loading}
                                        >
                                            {t('back')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={loading}
                                            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {loading ? t('creatingAccount') : t('createAccount')}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Already have account */}
                        <div className="mt-8 text-center text-sm text-neutral-600">
                            {t('hasAccount')}{' '}
                            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                {t('logIn')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}