// src/app/[locale]/services/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ServiceCard from '@/components/services/ServiceCard';
import Pagination from '@/components/services/Pagination';
import { useProviders, usePagination, useDebouncedValue } from '@/hooks';

export default function ServicesPage() {
    const t = useTranslations('services');
    const tCommon = useTranslations('common');
    const tCat = useTranslations('categories');

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebouncedValue(searchTerm, 500);

    // Get providers with filters
    const {
        providers,
        loading,
        error,
        total,
        filters,
        updateFilters,
        clearFilters,
        sortBy,
        setSortBy
    } = useProviders({
        searchTerm: debouncedSearch
    });

    // Pagination
    const {
        currentItems,
        currentPage,
        totalPages,
        goToPage,
        startIndex,
        endIndex
    } = usePagination(providers, 12);

    // Categories
    const categories = [
        { id: 'all', name: t('allCategories'), icon: '🔍' },
        { id: 'education', name: tCat('education'), icon: '📚' },
        { id: 'home', name: tCat('home'), icon: '🏠' },
        { id: 'official', name: tCat('official'), icon: '📋' },
        { id: 'health', name: tCat('health'), icon: '💪' },
        { id: 'business', name: tCat('business'), icon: '💼' },
        { id: 'creative', name: tCat('creative'), icon: '🎨' }
    ];

    // Languages
    const languages = [
        { code: 'all', name: t('allLanguages'), flag: '🌍' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];

    // Sort options
    const sortOptions = [
        { value: 'recommended', label: t('recommended') },
        { value: 'rating', label: t('highestRated') },
        { value: 'price-low', label: t('lowestPrice') },
        { value: 'price-high', label: t('highestPrice') },
        { value: 'reviews', label: t('mostReviews') }
    ];

    const handleSortChange = (value: string) => {
        if (value === 'price-low') {
            setSortBy({ field: 'price', order: 'asc' });
        } else if (value === 'price-high') {
            setSortBy({ field: 'price', order: 'desc' });
        } else if (value === 'rating') {
            setSortBy({ field: 'rating', order: 'desc' });
        } else if (value === 'reviews') {
            setSortBy({ field: 'reviewCount', order: 'desc' });
        } else {
            setSortBy({ field: 'recommended', order: 'desc' });
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-semibold">Error loading providers</p>
                        <p className="text-red-500 mt-2">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t('searchPlaceholder')}
                                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-3 mb-4">

                        {/* Category Filter */}
                        <select
                            value={filters.category || 'all'}
                            onChange={(e) => updateFilters({ category: e.target.value === 'all' ? undefined : e.target.value })}
                            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Language Filter */}
                        <select
                            value={filters.language || 'all'}
                            onChange={(e) => updateFilters({ language: e.target.value === 'all' ? undefined : e.target.value })}
                            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>

                        {/* Verified Only */}
                        <label className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm cursor-pointer hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={filters.verifiedOnly || false}
                                onChange={(e) => updateFilters({ verifiedOnly: e.target.checked || undefined })}
                                className="w-4 h-4 text-primary-600 rounded"
                            />
                            <span>{t('verifiedOnly')}</span>
                        </label>

                        {/* Clear Filters */}
                        {(filters.category || filters.language || filters.verifiedOnly) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                {t('clearAll')}
                            </button>
                        )}
                    </div>

                    {/* Sort & Results Count */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-600">
                            {total > 0 ? (
                                <>
                                    Showing {startIndex}-{endIndex} of <strong>{total}</strong> {total === 1 ? t('providerFound') : t('providersFound')}
                                </>
                            ) : (
                                t('noProvidersFound')
                            )}
                        </p>

                        <select
                            value={`${sortBy.field}${sortBy.field === 'price' ? `-${sortBy.order === 'asc' ? 'low' : 'high'}` : ''}`}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {t('sortBy')}: {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl h-96 animate-pulse"></div>
                        ))}
                    </div>
                ) : total === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                            {t('noProvidersFound')}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            {t('tryAdjusting')}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {t('clearAll')}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Provider Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentItems.map(provider => (
                                <ServiceCard key={provider.id} provider={provider} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}