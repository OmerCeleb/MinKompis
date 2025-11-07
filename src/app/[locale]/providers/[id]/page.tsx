// src/app/[locale]/providers/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import BookingModal from '@/components/booking/BookingModal';
import ContactModal from '@/components/contact/ContactModal';
import { useProviders, useModal } from '@/hooks';

export default function ProviderProfilePage() {
    const params = useParams();
    const router = useRouter();
    const t = useTranslations('profile');
    const tCommon = useTranslations('common');

    const providerId = params.id as string;

    // Get provider data using hook
    const { getProviderById, loading } = useProviders();
    const provider = getProviderById(providerId);

    // Modal management with custom hook
    const bookingModal = useModal();
    const contactModal = useModal();

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-64 bg-neutral-200 rounded-2xl"></div>
                        <div className="h-96 bg-neutral-200 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white rounded-2xl p-12">
                        <div className="text-6xl mb-4">😕</div>
                        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                            Provider not found
                        </h1>
                        <p className="text-neutral-600 mb-6">
                            The provider you're looking for doesn't exist or has been removed.
                        </p>
                        <Button onClick={() => router.push('/services')}>
                            {t('backToServices')}
                        </Button>
                    </div>
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

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('backToServices')}
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Header Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <img
                                        src={provider.avatar}
                                        alt={`${provider.firstName} ${provider.lastName}`}
                                        className="w-32 h-32 rounded-2xl object-cover"
                                    />
                                    {provider.verified && (
                                        <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h1 className="text-3xl font-bold text-neutral-900 mb-1">
                                                {provider.firstName} {provider.lastName}
                                            </h1>
                                            <p className="text-lg text-neutral-600">{provider.businessName}</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-6 mb-4">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="font-semibold">{provider.rating.toFixed(1)}</span>
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
                                        <div className="flex gap-2">
                                            {provider.languages.map(lang => (
                                                <span key={lang} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                          {languageFlags[lang]} {lang.toUpperCase()}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location & Response Time */}
                                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {provider.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('typicallyResponds')} {provider.responseTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                {t('about')}
                            </h2>
                            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                                {provider.description}
                            </p>
                            {provider.experience && (
                                <div className="mt-4 pt-4 border-t border-neutral-200">
                                    <p className="text-sm text-neutral-600">
                                        <strong>{t('experience')}:</strong> {provider.experience}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                                Reviews ({provider.reviewCount})
                            </h2>
                            <div className="space-y-6">
                                {reviews.map(review => (
                                    <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={review.avatar}
                                                alt={review.author}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-neutral-900">
                                                        {review.author}
                                                    </h3>
                                                    <span className="text-sm text-neutral-500">
                            {review.date}
                          </span>
                                                </div>
                                                <div className="flex gap-1 mb-2">
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
                                                <p className="text-neutral-700">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

                            {/* Price */}
                            <div className="text-center mb-6 pb-6 border-b border-neutral-200">
                                <p className="text-sm text-neutral-600 mb-1">{tCommon('from')}</p>
                                <p className="text-4xl font-bold text-neutral-900">
                                    {provider.hourlyRate} <span className="text-lg font-normal text-neutral-600">SEK/h</span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    fullWidth
                                    size="lg"
                                    onClick={bookingModal.open}
                                >
                                    {t('bookAppointment')}
                                </Button>
                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="outline"
                                    onClick={contactModal.open}
                                >
                                    {t('contactProvider')}
                                </Button>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{t('responseTime')}: {provider.responseTime}</span>
                                </div>
                                {provider.verified && (
                                    <div className="flex items-center gap-3 text-green-600">
                                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{t('verifiedProvider')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <BookingModal
                isOpen={bookingModal.isOpen}
                onClose={bookingModal.close}
                provider={{
                    id: provider.id,
                    name: `${provider.firstName} ${provider.lastName}`,
                    avatar: provider.avatar,
                    title: provider.businessName,
                    hourlyRate: provider.hourlyRate
                }}
                serviceId="service-1"
            />

            <ContactModal
                isOpen={contactModal.isOpen}
                onClose={contactModal.close}
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