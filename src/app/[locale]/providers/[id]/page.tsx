// src/app/[locale]/providers/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { mockProviders } from '@/lib/mockData';
import { Button } from '@/components/shared';
import Link from 'next/link';

export default function ProviderProfilePage() {
    const params = useParams();
    const router = useRouter();
    const t = useTranslations('profile');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');

    const providerId = params.id as string;
    const provider = mockProviders.find(p => p.id === providerId);

    if (!provider) {
        return (
            <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">Provider not found</h1>
                    <Button onClick={() => router.push('/services')}>Back to services</Button>
                </div>
            </div>
        );
    }

    const languageFlags: Record<string, string> = {
        'sv': '🇸🇪',
        'en': '🇬🇧',
        'tr': '🇹🇷',
        'ar': '🇸🇦',
        'so': '🇸🇴',
        'es': '🇪🇸'
    };

    // Mock reviews
    const reviews = [
        {
            id: '1',
            author: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?img=44',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Excellent service! Very professional and helped me understand everything clearly. Highly recommend!'
        },
        {
            id: '2',
            author: 'Ahmed Ali',
            avatar: 'https://i.pravatar.cc/150?img=35',
            rating: 5,
            date: '1 month ago',
            comment: 'Great experience. Communication was smooth and the work was completed on time.'
        },
        {
            id: '3',
            author: 'Maria Garcia',
            avatar: 'https://i.pravatar.cc/150?img=38',
            rating: 4,
            date: '2 months ago',
            comment: 'Very helpful and knowledgeable. Would definitely work with again!'
        }
    ];

    // Mock portfolio images
    const portfolioImages = [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pt-20 pb-12">

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">{t('backToServices')}</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Provider Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Header Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <div className="flex items-start gap-6 mb-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={provider.avatar}
                                        alt={`${provider.firstName} ${provider.lastName}`}
                                        className="w-32 h-32 rounded-2xl object-cover ring-4 ring-neutral-100"
                                    />
                                    {provider.verified && (
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center ring-4 ring-white">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                                        {provider.firstName} {provider.lastName}
                                    </h1>
                                    <p className="text-xl text-neutral-600 mb-4">{provider.businessName}</p>

                                    {/* Stats */}
                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-lg font-bold text-neutral-900">{provider.rating}</span>
                                            </div>
                                            <span className="text-neutral-500">({provider.reviewCount} {t('reviews')})</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{provider.completedJobs} {t('completedJobs')}</span>
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm font-medium text-neutral-700">{t('languages')}:</span>
                                        <div className="flex items-center gap-2">
                                            {provider.languages.map((lang) => (
                                                <span key={lang} className="text-2xl" title={lang}>
                          {languageFlags[lang] || '🌍'}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location & Experience */}
                                    <div className="flex items-center gap-4 text-sm text-neutral-600">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{provider.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>{provider.experience} {t('experience')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time Badge */}
                            <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  ✓ {tServices('available')}
                </span>
                                <span className="text-sm text-neutral-600">
                  ⚡ {t('typicallyResponds')} {provider.responseTime}
                </span>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('about')}</h2>
                            <p className="text-neutral-700 leading-relaxed">
                                {provider.description}
                            </p>
                        </div>

                        {/* Portfolio */}
                        {portfolioImages.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('portfolio')}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {portfolioImages.map((img, index) => (
                                        <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                                            <img
                                                src={img}
                                                alt={`Portfolio ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-neutral-900">{t('reviews')}</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="font-semibold text-neutral-900">{provider.rating}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={review.avatar}
                                                alt={review.author}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-900">{review.author}</h4>
                                                        <p className="text-sm text-neutral-500">{review.date}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 sticky top-24">

                            {/* Price */}
                            <div className="text-center mb-6 pb-6 border-b border-neutral-200">
                                <div className="text-sm text-neutral-600 mb-2">{tServices('from')}</div>
                                <div className="text-4xl font-bold text-neutral-900 mb-1">
                                    {provider.hourlyRate} <span className="text-xl font-normal text-neutral-600">{tServices('sek')}/h</span>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="space-y-3 mb-6">
                                <Button fullWidth size="lg" className="font-semibold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    {t('contactProvider')}
                                </Button>

                                <Button fullWidth size="lg" variant="outline" className="font-semibold">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {t('bookAppointment')}
                                </Button>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{t('responseTime')}: {provider.responseTime}</span>
                                </div>

                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span>{provider.verified ? t('verifiedProvider') : t('unverified')}</span>
                                </div>

                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{provider.location}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}