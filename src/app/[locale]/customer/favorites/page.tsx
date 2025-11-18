// src/app/[locale]/customer/favorites/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useToast } from '@/hooks';

interface FavoriteProvider {
    id: string;
    name: string;
    avatar: string;
    title: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    languages: string[];
    categories: string[];
    verified: boolean;
    responseTime: string;
    savedAt: string;
}

export default function CustomerFavoritesPage() {
    const t = useTranslations('customer.favorites');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');
    const { showToast } = useToast();

    // Mock data - Backend'den gelecek
    const [favorites, setFavorites] = useState<FavoriteProvider[]>([
        {
            id: '1',
            name: 'Ayşe Yılmaz',
            avatar: 'https://i.pravatar.cc/150?img=1',
            title: 'Swedish Language Teacher',
            rating: 4.9,
            reviewCount: 127,
            hourlyRate: 450,
            languages: ['tr', 'sv', 'en'],
            categories: ['education'],
            verified: true,
            responseTime: '1 hour',
            savedAt: '2024-11-10'
        },
        {
            id: '3',
            name: 'Elena Popov',
            avatar: 'https://i.pravatar.cc/150?img=20',
            title: 'Certified Translator',
            rating: 5.0,
            reviewCount: 156,
            hourlyRate: 600,
            languages: ['en', 'sv', 'tr'],
            categories: ['official'],
            verified: true,
            responseTime: '2 hours',
            savedAt: '2024-11-08'
        },
        {
            id: '2',
            name: 'Mohamed Hassan',
            avatar: 'https://i.pravatar.cc/150?img=12',
            title: 'Professional Cleaner',
            rating: 4.8,
            reviewCount: 89,
            hourlyRate: 280,
            languages: ['ar', 'sv', 'en'],
            categories: ['home'],
            verified: true,
            responseTime: '30 min',
            savedAt: '2024-11-05'
        },
        {
            id: '4',
            name: 'Ali Demir',
            avatar: 'https://i.pravatar.cc/150?img=14',
            title: 'Personal Trainer',
            rating: 4.7,
            reviewCount: 73,
            hourlyRate: 400,
            languages: ['tr', 'sv'],
            categories: ['health'],
            verified: true,
            responseTime: '3 hours',
            savedAt: '2024-11-01'
        }
    ]);

    const languageFlags: Record<string, string> = {
        'sv': '🇸🇪',
        'en': '🇬🇧',
        'tr': '🇹🇷',
        'ar': '🇸🇦',
        'so': '🇸🇴',
        'es': '🇪🇸'
    };

    const handleRemoveFavorite = async (providerId: string) => {
        try {
            // TODO: Backend API call
            await new Promise(resolve => setTimeout(resolve, 300));

            setFavorites(prev => prev.filter(f => f.id !== providerId));
            showToast(t('removeSuccess'), 'success');
        } catch (error) {
            showToast(t('removeError'), 'error');
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-neutral-300 fill-current'
                        }`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                            {t('title')}
                        </h1>
                        <p className="text-neutral-600">{t('subtitle')}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">{favorites.length} {t('savedProviders')}</span>
                    </div>
                </div>
            </div>

            {/* Favorites Grid */}
            {favorites.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {favorites.map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-all group"
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <Link href={`/providers/${provider.id}`}>
                                    <div className="relative">
                                        <img
                                            src={provider.avatar}
                                            alt={provider.name}
                                            className="w-20 h-20 rounded-xl object-cover ring-2 ring-neutral-100 group-hover:ring-primary-300 transition-all"
                                        />
                                        {provider.verified && (
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center ring-2 ring-white">
                                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={`/providers/${provider.id}`}
                                        className="font-bold text-lg text-neutral-900 hover:text-primary-600 transition-colors block mb-1"
                                    >
                                        {provider.name}
                                    </Link>
                                    <p className="text-sm text-neutral-600 mb-2">{provider.title}</p>
                                    <div className="flex items-center gap-2">
                                        {renderStars(provider.rating)}
                                        <span className="text-sm font-semibold text-neutral-900">{provider.rating}</span>
                                        <span className="text-sm text-neutral-500">({provider.reviewCount})</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemoveFavorite(provider.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title={t('remove')}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-4">
                                {/* Languages */}
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {provider.languages.map((lang) => (
                                            <span key={lang} className="text-lg" title={lang}>
                                                {languageFlags[lang] || '🌍'}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{tServices('repliesIn')} {provider.responseTime}</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                                    <span className="text-sm text-neutral-600">{tServices('from')}</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        {provider.hourlyRate} {tServices('sek')}
                                        <span className="text-sm text-neutral-500 font-normal">/{tServices('hour')}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <Link href={`/providers/${provider.id}`} className="flex-1">
                                    <Button variant="outline" fullWidth size="sm">
                                        {t('viewProfile')}
                                    </Button>
                                </Link>
                                <Link href={`/providers/${provider.id}#book`} className="flex-1">
                                    <Button fullWidth size="sm">
                                        {t('bookNow')}
                                    </Button>
                                </Link>
                            </div>

                            {/* Saved Date */}
                            <div className="mt-4 pt-4 border-t border-neutral-200 text-xs text-neutral-500 text-center">
                                {t('savedOn')} {provider.savedAt}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                            {t('noFavorites')}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            {t('noFavoritesDesc')}
                        </p>
                        <Link href="/services">
                            <Button size="lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {t('browseProviders')}
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 mb-1">{t('tipTitle')}</h3>
                        <p className="text-sm text-blue-800">{t('tipDesc')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}