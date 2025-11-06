// src/app/[locale]/providers/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { mockProviders } from '@/lib/mockData';
import { Button } from '@/components/shared';
import BookingModal from '@/components/booking/BookingModal';
import ContactModal from '@/components/contact/ContactModal';
import Link from 'next/link';

export default function ProviderProfilePage() {
    const params = useParams();
    const router = useRouter();
    const t = useTranslations('profile');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');

    // Modal states
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

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
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                                        {provider.firstName} {provider.lastName}
                                    </h1>
                                    <p className="text-lg text-neutral-600 mb-4">{provider.businessName}</p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-5 h-5 ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-neutral-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="font-semibold text-neutral-900">{provider.rating}</span>
                                            <span className="text-neutral-600">({provider.reviewCount} {t('reviews')})</span>
                                        </div>
                                        <span className="text-neutral-300">•</span>
                                        <span className="text-neutral-600">{provider.completedJobs} {t('completedJobs')}</span>
                                        <span className="text-neutral-300">•</span>
                                        <span className="text-neutral-600">{provider.experience}</span>
                                    </div>

                                    {/* Verified Badge */}
                                    {provider.verified && (
                                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {t('verifiedProvider')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-200">
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{provider.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{t('typicallyResponds')} {provider.responseTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('about')}</h2>
                            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                                {provider.description}
                            </p>
                        </div>

                        {/* Languages */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t('languages')}</h2>
                            <div className="flex flex-wrap gap-3">
                                {provider.languages.map((lang) => (
                                    <div
                                        key={lang}
                                        className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg"
                                    >
                                        <span className="text-2xl">{languageFlags[lang]}</span>
                                        <span className="font-medium text-neutral-900">
                                            {lang === 'sv' && 'Svenska'}
                                            {lang === 'en' && 'English'}
                                            {lang === 'tr' && 'Türkçe'}
                                            {lang === 'ar' && 'العربية'}
                                            {lang === 'so' && 'Soomaali'}
                                            {lang === 'es' && 'Español'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Portfolio */}
                        {portfolioImages.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('portfolio')}</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {portfolioImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="aspect-video rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer"
                                        >
                                            <img
                                                src={image}
                                                alt={`Portfolio ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                                {t('reviews')} ({reviews.length})
                            </h2>
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="pb-6 border-b border-neutral-200 last:border-0">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={review.avatar}
                                                alt={review.author}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-neutral-900">{review.author}</h4>
                                                    <span className="text-sm text-neutral-500">{review.date}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
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
                                <div className="text-4xl font-bold text-neutral-900 mb-1">
                                    {provider.hourlyRate} {tServices('sek')}
                                </div>
                                <div className="text-neutral-600">{tCommon('perHour')}</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    fullWidth
                                    size="lg"
                                    onClick={() => setShowBookingModal(true)}
                                    className="font-semibold"
                                >
                                    {t('bookAppointment')}
                                </Button>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    onClick={() => setShowContactModal(true)}
                                >
                                    {t('contactProvider')}
                                </Button>
                            </div>

                            {/* Info */}
                            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">{t('responseTime')}: {provider.responseTime}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">{provider.completedJobs}+ {t('completedJobs')}</span>
                                </div>
                                {provider.verified && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-neutral-700">{t('verifiedProvider')}</span>
                                    </div>
                                )}
                            </div>

                            {/* Safety Note */}
                            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex gap-2">
                                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-blue-800">
                                        Always communicate and pay through MinKompis to stay protected.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                provider={{
                    id: provider.id,
                    firstName: provider.firstName,
                    lastName: provider.lastName,
                    avatar: provider.avatar,
                    hourlyRate: provider.hourlyRate
                }}
                service={{
                    title: provider.businessName,
                    duration: 60
                }}
            />

            {/* Contact Modal */}
            <ContactModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                provider={{
                    id: provider.id,
                    firstName: provider.firstName,
                    lastName: provider.lastName,
                    avatar: provider.avatar,
                    responseTime: provider.responseTime
                }}
            />

        </div>
    );
}