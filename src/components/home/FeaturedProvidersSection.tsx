// src/components/home/FeaturedProvidersSection.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '../shared';

const featuredProviders = [
    {
        id: '1',
        name: 'Ayşe Yılmaz',
        title: 'Swedish Language Teacher',
        avatar: 'https://i.pravatar.cc/300?img=47',
        rating: 4.9,
        reviewCount: 127,
        completedJobs: 230,
        responseTime: '2 hours',
        hourlyRate: 450,
        verified: true,
        category: 'education'
    },
    {
        id: '2',
        name: 'Ahmed Hassan',
        title: 'Immigration Consultant',
        avatar: 'https://i.pravatar.cc/300?img=33',
        rating: 4.8,
        reviewCount: 95,
        completedJobs: 180,
        responseTime: '3 hours',
        hourlyRate: 600,
        verified: true,
        category: 'official'
    },
    {
        id: '3',
        name: 'Maria Garcia',
        title: 'Home Cleaning Specialist',
        avatar: 'https://i.pravatar.cc/300?img=45',
        rating: 5.0,
        reviewCount: 203,
        completedJobs: 450,
        responseTime: '1 hour',
        hourlyRate: 350,
        verified: true,
        category: 'home'
    }
];

export default function FeaturedProvidersSection() {
    const t = useTranslations('home');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        {t('featuredProviders.title')}
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {t('featuredProviders.subtitle')}
                    </p>
                </div>

                {/* Provider Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredProviders.map((provider) => (
                        <div
                            key={provider.id}
                            className="group bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Card Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={provider.avatar}
                                    alt={provider.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                {provider.verified && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {tCommon('verified')}
                                    </div>
                                )}

                                {/* Stats Overlay */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{provider.rating}</span>
                                        <span className="text-neutral-400">({provider.reviewCount})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    {provider.name}
                                </h3>
                                <p className="text-sm text-neutral-600 mb-3">{provider.title}</p>

                                {/* Quick Stats */}
                                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{provider.completedJobs} {tServices('jobs')}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{provider.responseTime}</span>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-xs text-neutral-500">{tServices('from')}</span>
                                        <div className="text-xl font-bold text-primary-600">
                                            {provider.hourlyRate} {tServices('sek')}
                                            <span className="text-sm text-neutral-500 font-normal">/{tServices('hour')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link href={`/providers/${provider.id}`}>
                                    <Button
                                        fullWidth
                                        size="sm"
                                        variant="primary"
                                        className="group-hover:shadow-lg transition-shadow"
                                    >
                                        {tCommon('viewProfile')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/services">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8"
                        >
                            {tCommon('seeAll')} →
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}