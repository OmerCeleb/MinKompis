// src/app/[locale]/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ServiceCard from '@/components/services/ServiceCard';
import Pagination from '@/components/services/Pagination';
import { useProviders, usePagination, useDebouncedValue } from '@/hooks';

export default function ServicesPage() {
    const t = useTranslations('services');
    const tCommon = useTranslations('common');
    const tCat = useTranslations('categories');
    const searchParams = useSearchParams();

    // Get URL parameters
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || undefined;
    const urlLanguage = searchParams.get('language') || undefined;
    const urlLocation = searchParams.get('location') || undefined;

    // Search state - initialize with URL parameter
    const [searchTerm, setSearchTerm] = useState(urlSearch);
    const debouncedSearch = useDebouncedValue(searchTerm, 500);

    // Get providers with filters - initialize with URL parameters
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
        searchTerm: debouncedSearch,
        category: urlCategory,
        language: urlLanguage,
        location: urlLocation
    });

    // Update search term when URL changes
    useEffect(() => {
        const newSearch = searchParams.get('search') || '';
        if (newSearch !== searchTerm) {
            setSearchTerm(newSearch);
        }
    }, [searchParams]);

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
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ];

    // Locations
    const locations = [
        { id: 'all', name: t('allLocations') },
        { id: 'Stockholm', name: 'Stockholm' },
        { id: 'Göteborg', name: 'Göteborg' },
        { id: 'Malmö', name: 'Malmö' },
        { id: 'Uppsala', name: 'Uppsala' },
    ];

    // Sort options
    const sortOptions = [
        { value: 'recommended', label: t('recommended') },
        { value: 'highestRated', label: t('highestRated') },
        { value: 'lowestPrice', label: t('lowestPrice') },
        { value: 'highestPrice', label: t('highestPrice') },
        { value: 'mostReviews', label: t('mostReviews') },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

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
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
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

                        {/* Location Filter */}
                        <select
                            value={filters.location || 'all'}
                            onChange={(e) => updateFilters({ location: e.target.value === 'all' ? undefined : e.target.value })}
                            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        >
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>
                                    📍 {loc.name}
                                </option>
                            ))}
                        </select>

                        {/* Verified Only */}
                        <label className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm cursor-pointer hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={filters.verifiedOnly || false}
                                onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
                                className="rounded text-primary-500 focus:ring-primary-500"
                            />
                            <span>✓ {t('verifiedOnly')}</span>
                        </label>

                        {/* Clear Filters */}
                        {(filters.category || filters.language || filters.location || filters.verifiedOnly || searchTerm) && (
                            <button
                                onClick={() => {
                                    clearFilters();
                                    setSearchTerm('');
                                }}
                                className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                {t('clearAll')}
                            </button>
                        )}
                    </div>

                    {/* Results Count & Sort */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                        <div className="text-sm text-neutral-600">
                            {t('showing')} <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, total)}</span> {t('of')} <span className="font-semibold">{total}</span> {total === 1 ? t('providerFound') : t('providersFound')}
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-600">{t('sortBy')}:</span>
                            <select
                                value={`${sortBy.field}-${sortBy.order}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('-');
                                    setSortBy({ field: field as any, order: order as 'asc' | 'desc' });
                                }}
                                className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && currentItems.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                            {t('noProvidersFound')}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            {t('tryAdjusting')}
                        </p>
                        <button
                            onClick={() => {
                                clearFilters();
                                setSearchTerm('');
                            }}
                            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                            {t('clearAll')}
                        </button>
                    </div>
                )}

                {/* Services Grid */}
                {!loading && !error && currentItems.length > 0 && (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentItems.map((provider) => (
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