// src/components/services/ServiceCard.tsx
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type Provider } from '@/lib/mockData';

interface ServiceCardProps {
    provider: Provider;
}

export default function ServiceCard({ provider }: ServiceCardProps) {
    const t = useTranslations('services');

    const languageFlags: Record<string, string> = {
        'sv': '🇸🇪',
        'en': '🇬🇧',
        'tr': '🇹🇷',
        'ar': '🇸🇦',
        'so': '🇸🇴',
        'es': '🇪🇸'
    };

    const availabilityColors = {
        available: 'bg-green-100 text-green-700',
        busy: 'bg-yellow-100 text-yellow-700',
        offline: 'bg-neutral-100 text-neutral-600'
    };

    const availabilityText = {
        available: t('available'),
        busy: t('busy'),
        offline: t('offline')
    };

    return (
        <Link href={`/providers/${provider.id}`}>
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">

                {/* Provider Avatar & Status */}
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                            <img
                                src={provider.avatar}
                                alt={`${provider.firstName} ${provider.lastName}`}
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-100"
                            />
                            {provider.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center ring-2 ring-white">
                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors truncate">
                                {provider.firstName} {provider.lastName}
                            </h3>
                            <p className="text-sm text-neutral-600 truncate">{provider.businessName}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm font-semibold text-neutral-900">{provider.rating}</span>
                                </div>
                                <span className="text-sm text-neutral-500">({provider.reviewCount})</span>
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        {provider.languages.slice(0, 4).map((lang) => (
                            <span key={lang} className="text-lg" title={lang}>
                {languageFlags[lang] || '🌍'}
              </span>
                        ))}
                        {provider.languages.length > 4 && (
                            <span className="text-xs text-neutral-500">+{provider.languages.length - 4}</span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                        {provider.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-neutral-600 mb-4">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{provider.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{provider.completedJobs} jobs</span>
                        </div>
                    </div>

                    {/* Availability & Response Time */}
                    <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${availabilityColors[provider.availability]}`}>
              {availabilityText[provider.availability]}
            </span>
                        <span className="text-xs text-neutral-500">
             {t('repliesIn')}{provider.responseTime}
            </span>
                    </div>
                </div>

                {/* Footer - Price & Action */}
                <div className="mt-auto border-t border-neutral-200 p-4 bg-neutral-50 flex items-center justify-between">
                    <div>
                        <div className="text-sm text-neutral-600"> {t('from')} </div>
                        <div className="text-2xl font-bold text-neutral-900">
                            {provider.hourlyRate} <span className="text-sm font-normal text-neutral-600">SEK/h</span>
                        </div>
                    </div>

                    <button className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm group-hover:shadow-lg">
                        {t('viewProfile')}
                    </button>
                </div>

            </div>
        </Link>
    );
}