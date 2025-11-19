// src/components/home/HeroSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/shared';

export default function HeroSection() {
    const t = useTranslations('home.hero');
    const tCat = useTranslations('categories');
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Hizmet kategorileri ve popüler aramalar
    const services = [
        { id: 'swedish-lessons', name: tCat('education'), keywords: ['İsveççe', 'Swedish', 'Svenska', 'dil', 'öğretmen', 'ders'], icon: '📚', category: 'education' },
        { id: 'cleaning', name: tCat('home'), keywords: ['temizlik', 'cleaning', 'städning', 'ev', 'home'], icon: '🧹', category: 'home' },
        { id: 'translation', name: tCat('official'), keywords: ['tercüme', 'translation', 'översättning', 'evrak', 'belge'], icon: '📄', category: 'official' },
        { id: 'repair', name: tCat('home'), keywords: ['tamirat', 'repair', 'reparation', 'tadilat'], icon: '🔧', category: 'home' },
        { id: 'tutoring', name: tCat('education'), keywords: ['özel ders', 'tutoring', 'matematik', 'math'], icon: '👨‍🏫', category: 'education' },
        { id: 'coaching', name: tCat('education'), keywords: ['koçluk', 'coaching', 'kariyer', 'career'], icon: '💼', category: 'education' },
        { id: 'permit', name: tCat('official'), keywords: ['oturum', 'permit', 'uppehållstillstånd', 'vize', 'danışmanlık'], icon: '📋', category: 'official' },
        { id: 'moving', name: tCat('home'), keywords: ['taşıma', 'moving', 'flyttning', 'nakliye'], icon: '📦', category: 'home' },
    ];

    // Arama sonuçlarını filtrele
    const filteredServices = searchQuery.trim().length > 0
        ? services.filter(service =>
            service.keywords.some(keyword =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase())
            ) || service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Dropdown dışına tıklanınca kapat
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const locale = pathname.split('/')[1] || 'tr';
        router.push(`/${locale}/services?search=${encodeURIComponent(searchQuery.trim())}`);
        setShowDropdown(false);
    };

    const handleServiceClick = (service: typeof services[0]) => {
        const locale = pathname.split('/')[1] || 'tr';
        router.push(`/${locale}/services?category=${service.category}`);
        setShowDropdown(false);
        setSearchQuery('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setShowDropdown(e.target.value.trim().length > 0);
    };

    return (
        <section className="relative min-h-[800px] flex items-center pt-16" style={{ overflow: 'visible', zIndex: 20 }}>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                    alt="People working together"
                    className="w-full h-full object-cover"
                />
                {/* Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-900/90 to-amber-800/85"></div>
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Text Content */}
                    <div className="text-white">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            {t('title')}
                        </h1>

                        <p className="text-xl md:text-2xl text-amber-100 mb-10 leading-relaxed">
                            {t('subtitle')}
                        </p>

                        {/* Search Bar with Dropdown */}
                        <div className="mb-8">
                            <form onSubmit={handleSearch}>
                                <div ref={dropdownRef} className="relative">
                                    <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
                                        <div className="flex-1 flex items-center gap-3 px-4">
                                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleInputChange}
                                                onFocus={() => searchQuery.trim().length > 0 && setShowDropdown(true)}
                                                placeholder={t('searchPlaceholder')}
                                                className="flex-1 py-4 text-lg border-0 focus:outline-none bg-transparent text-neutral-800 placeholder-neutral-400"
                                            />
                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setShowDropdown(false);
                                                    }}
                                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="px-8 py-4 text-lg font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            {t('searchButton')}
                                        </Button>
                                    </div>

                                    {/* Dropdown Results */}
                                    {showDropdown && filteredServices.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200" style={{ zIndex: 9999 }}>
                                            <div className="max-h-96 overflow-y-auto">
                                                {filteredServices.map((service) => (
                                                    <button
                                                        key={service.id}
                                                        onClick={() => handleServiceClick(service)}
                                                        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors text-left border-b border-neutral-100 last:border-b-0"
                                                    >
                                                        <div className="text-3xl">{service.icon}</div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-neutral-900 text-lg">
                                                                {service.name}
                                                            </div>
                                                            <div className="text-sm text-neutral-500">
                                                                {service.keywords.slice(0, 3).join(', ')}
                                                            </div>
                                                        </div>
                                                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Show All Results Button */}
                                            <button
                                                onClick={handleSearch}
                                                className="w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 text-primary-600 font-semibold border-t-2 border-neutral-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                Tüm sonuçları göster "{searchQuery}"
                                            </button>
                                        </div>
                                    )}

                                    {/* No Results Message */}
                                    {showDropdown && searchQuery.trim().length > 0 && filteredServices.length === 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl p-6 border border-neutral-200 text-center" style={{ zIndex: 9999 }}>
                                            <div className="text-4xl mb-2">🔍</div>
                                            <p className="text-neutral-600 mb-4">
                                                "{searchQuery}" için önceden tanımlı kategori bulunamadı
                                            </p>
                                            <button
                                                onClick={handleSearch}
                                                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                                            >
                                                Yine de ara
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                    <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                    <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                    <img src="https://i.pravatar.cc/40?img=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold">500+ Happy Customers</div>
                                    <div className="flex items-center gap-1 text-amber-200">
                                        <span>★★★★★</span>
                                        <span className="text-xs">4.8/5</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/20"></div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">500+</div>
                                    <div className="text-sm text-amber-100">{t('stats.providers')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">15+</div>
                                    <div className="text-sm text-amber-100">{t('stats.languages')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">24/7</div>
                                    <div className="text-sm text-amber-100">{t('stats.support')}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Visual Elements */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10">
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                                    alt="Happy customer"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            {/* Floating Card 1 - Top Right */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-900">Verified Provider</div>
                                        <div className="text-xs text-neutral-500">Background checked</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2 - Bottom Left */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 animate-float-delayed">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/40?img=5" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/40?img=6" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                                        <img src="https://i.pravatar.cc/40?img=7" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-900">50+ Bookings</div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-400">★★★★★</span>
                                            <span className="text-xs text-neutral-500">4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}