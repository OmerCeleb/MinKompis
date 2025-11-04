'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { mockProviders, filterProviders, type Provider } from '@/lib/mockData';
import SearchBar from '@/components/services/SearchBar';
import FilterSidebar from '@/components/services/FilterSidebar';
import ServiceCard from '@/components/services/ServiceCard';
import Pagination from '@/components/services/Pagination';

export default function ServicesPage() {
    const t = useTranslations('services');
    const tCommon = useTranslations('common');

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 12;

    // Filter providers
    const filteredProviders = useMemo(() => {
        return filterProviders(mockProviders, {
            search: searchQuery,
            category: selectedCategory,
            language: selectedLanguage,
            location: selectedLocation,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            verifiedOnly
        });
    }, [searchQuery, selectedCategory, selectedLanguage, selectedLocation, priceRange, verifiedOnly]);

    // Pagination
    const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProviders = filteredProviders.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-neutral-600">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Search Bar */}
                <SearchBar
                    value={searchQuery}
                    onChange={(value) => {
                        setSearchQuery(value);
                        handleFilterChange();
                    }}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                    showFilters={showFilters}
                    placeholder={t('searchPlaceholder')}
                />

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-neutral-600">
                        <span className="font-semibold text-neutral-900">{filteredProviders.length}</span>{' '}
                        {filteredProviders.length === 1 ? t('providerFound') : t('providersFound')}
                    </p>

                    {/* Sort */}
                    <select className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>{t('sortBy')}: {t('recommended')}</option>
                        <option>{t('highestRated')}</option>
                        <option>{t('lowestPrice')}</option>
                        <option>{t('highestPrice')}</option>
                        <option>{t('mostReviews')}</option>
                    </select>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">

                    {/* Filter Sidebar */}
                    <FilterSidebar
                        show={showFilters}
                        selectedCategory={selectedCategory}
                        selectedLanguage={selectedLanguage}
                        selectedLocation={selectedLocation}
                        priceRange={priceRange}
                        verifiedOnly={verifiedOnly}
                        onCategoryChange={(cat) => {
                            setSelectedCategory(cat);
                            handleFilterChange();
                        }}
                        onLanguageChange={(lang) => {
                            setSelectedLanguage(lang);
                            handleFilterChange();
                        }}
                        onLocationChange={(loc) => {
                            setSelectedLocation(loc);
                            handleFilterChange();
                        }}
                        onPriceRangeChange={(range) => {
                            setPriceRange(range);
                            handleFilterChange();
                        }}
                        onVerifiedChange={(verified) => {
                            setVerifiedOnly(verified);
                            handleFilterChange();
                        }}
                        onClearFilters={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                            setSelectedLanguage('all');
                            setSelectedLocation('all');
                            setPriceRange({ min: 0, max: 1000 });
                            setVerifiedOnly(false);
                            handleFilterChange();
                        }}
                    />

                    {/* Provider Grid */}
                    <div className="flex-1">
                        {currentProviders.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProviders.map((provider) => (
                                        <ServiceCard key={provider.id} provider={provider} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-neutral-900 mb-2">{t('noProvidersFound')}</h3>
                                <p className="text-neutral-600 mb-6">{t('tryAdjusting')}</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                        setSelectedLanguage('all');
                                        setSelectedLocation('all');
                                        setPriceRange({ min: 0, max: 1000 });
                                        setVerifiedOnly(false);
                                        handleFilterChange();
                                    }}
                                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                                >
                                    {t('clearAll')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}