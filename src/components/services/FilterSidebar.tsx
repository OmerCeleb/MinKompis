// src/components/services/FilterSidebar.tsx
'use client';

import { useTranslations } from 'next-intl';

interface FilterSidebarProps {
    show: boolean;
    selectedCategory: string;
    selectedLanguage: string;
    selectedLocation: string;
    priceRange: { min: number; max: number };
    verifiedOnly: boolean;
    onCategoryChange: (category: string) => void;
    onLanguageChange: (language: string) => void;
    onLocationChange: (location: string) => void;
    onPriceRangeChange: (range: { min: number; max: number }) => void;
    onVerifiedChange: (verified: boolean) => void;
    onClearFilters: () => void;
}

export default function FilterSidebar({
                                          show,
                                          selectedCategory,
                                          selectedLanguage,
                                          selectedLocation,
                                          priceRange,
                                          verifiedOnly,
                                          onCategoryChange,
                                          onLanguageChange,
                                          onLocationChange,
                                          onPriceRangeChange,
                                          onVerifiedChange,
                                          onClearFilters
                                      }: FilterSidebarProps) {
    const t = useTranslations('services');
    const tCat = useTranslations('categories');

    const categories = [
        { id: 'all', name: t('allCategories'), icon: '🔍' },
        { id: 'education', name: tCat('education'), icon: '📚' },
        { id: 'home', name: tCat('home'), icon: '🏠' },
        { id: 'official', name: tCat('official'), icon: '📋' },
        { id: 'health', name: tCat('health'), icon: '💪' },
        { id: 'business', name: tCat('business'), icon: '💼' },
        { id: 'creative', name: tCat('creative'), icon: '🎨' },
    ];

    const languages = [
        { code: 'all', name: t('allLanguages'), flag: '🌍' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ];

    const locations = [
        { id: 'all', name: t('allLocations') },
        { id: 'Stockholm', name: 'Stockholm' },
        { id: 'Göteborg', name: 'Göteborg' },
        { id: 'Malmö', name: 'Malmö' },
        { id: 'Uppsala', name: 'Uppsala' },
        { id: 'Lund', name: 'Lund' },
        { id: 'Linköping', name: 'Linköping' },
        { id: 'Örebro', name: 'Örebro' },
        { id: 'Västerås', name: 'Västerås' },
        { id: 'Helsingborg', name: 'Helsingborg' },
    ];

    return (
        <aside className={`w-80 flex-shrink-0 ${show ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-neutral-900">Filters</h3>
                    <button
                        onClick={onClearFilters}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Clear all
                    </button>
                </div>

                {/* Verified Only */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={verifiedOnly}
                            onChange={(e) => onVerifiedChange(e.target.checked)}
                            className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">Verified only</span>
                        </div>
                    </label>
                </div>

                {/* Categories */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Category</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                                    selectedCategory === category.id
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-neutral-700 hover:bg-neutral-50'
                                }`}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span className="text-sm">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Language</h4>
                    <div className="space-y-2">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => onLanguageChange(language.code)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                                    selectedLanguage === language.code
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-neutral-700 hover:bg-neutral-50'
                                }`}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <span className="text-sm">{language.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Location */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Location</h4>
                    <select
                        value={selectedLocation}
                        onChange={(e) => onLocationChange(e.target.value)}
                        className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Price per hour</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-neutral-600 mb-1 block">Min: {priceRange.min} SEK</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={priceRange.min}
                                onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })}
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-neutral-600 mb-1 block">Max: {priceRange.max} SEK</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={priceRange.max}
                                onChange={(e) => onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })}
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
                            <span>{priceRange.min} SEK</span>
                            <span>-</span>
                            <span>{priceRange.max} SEK</span>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}