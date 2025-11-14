// src/app/[locale]/providers/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/shared';
import { BookingModal } from '@/components/booking';
import { ContactModal } from '@/components/contact';

export default function ProviderProfilePage() {
    const params = useParams();
    const router = useRouter();
    const t = useTranslations('profile');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Mock provider data - Backend'den gelecek
    const provider = {
        id: params.id as string,
        name: 'Ayşe Yılmaz',
        title: 'Swedish Language Teacher & Immigration Consultant',
        avatar: 'https://i.pravatar.cc/300?img=47',
        rating: 4.9,
        reviewCount: 127,
        completedJobs: 230,
        responseTime: '2 hours',
        languages: ['Turkish', 'Swedish', 'English'],
        location: 'Stockholm, Sweden',
        verified: true,
        memberSince: 'January 2023',
        about: `Passionate Swedish language teacher with over 8 years of experience helping immigrants settle in Sweden. I specialize in teaching Swedish to Turkish speakers and providing immigration consultation services.

My teaching approach is personalized and patient. I understand the challenges of learning a new language and adapting to a new country because I went through it myself. I focus on practical conversation skills and real-life situations to help you integrate quickly.

I also offer consultation on residence permits, work permits, and navigating Swedish bureaucracy. Having helped over 200 families successfully settle in Sweden, I know the system inside and out.`,
        services: [
            {
                id: '1',
                title: 'Swedish Language Lessons - Beginner',
                price: 450,
                duration: 60,
                category: 'Education'
            },
            {
                id: '2',
                title: 'Swedish Language Lessons - Intermediate',
                price: 500,
                duration: 60,
                category: 'Education'
            },
            {
                id: '3',
                title: 'Residence Permit Consultation',
                price: 600,
                duration: 90,
                category: 'Official Services'
            }
        ],
        portfolio: [
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
        ],
        reviews: [
            {
                id: '1',
                customer: {
                    name: 'Mehmet Kaya',
                    avatar: 'https://i.pravatar.cc/150?img=33'
                },
                rating: 5,
                comment: 'Excellent teacher! Very patient and explains everything clearly. My Swedish improved dramatically in just 3 months.',
                date: '2024-11-01',
                service: 'Swedish Language Lessons - Beginner'
            },
            {
                id: '2',
                customer: {
                    name: 'Fatma Öztürk',
                    avatar: 'https://i.pravatar.cc/150?img=45'
                },
                rating: 5,
                comment: 'Helped me get my permanent residence permit. Very knowledgeable and supportive throughout the process!',
                date: '2024-10-28',
                service: 'Residence Permit Consultation'
            },
            {
                id: '3',
                customer: {
                    name: 'Ali Demir',
                    avatar: 'https://i.pravatar.cc/150?img=12'
                },
                rating: 5,
                comment: 'Best investment I made! Now I can speak Swedish confidently at work and with neighbors.',
                date: '2024-10-20',
                service: 'Swedish Language Lessons - Intermediate'
            },
            {
                id: '4',
                customer: {
                    name: 'Zeynep Aydın',
                    avatar: 'https://i.pravatar.cc/150?img=44'
                },
                rating: 4,
                comment: 'Very good teacher. Flexible with scheduling and always prepared for lessons.',
                date: '2024-10-15',
                service: 'Swedish Language Lessons - Beginner'
            }
        ],
        availability: {
            monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
            tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
            wednesday: ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'],
            thursday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
            friday: ['09:00', '10:00', '11:00', '14:00'],
            saturday: [],
            sunday: []
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-5 h-5 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-neutral-300 fill-current'
                        }`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Back Button */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">{t('backToServices')}</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <Image
                                        src={provider.avatar}
                                        alt={provider.name}
                                        width={120}
                                        height={120}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
                                    />
                                    {provider.verified && (
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
                                                {provider.name}
                                            </h1>
                                            <p className="text-neutral-600 mb-3">{provider.title}</p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {renderStars(provider.rating)}
                                                <span className="font-semibold text-neutral-900">{provider.rating}</span>
                                                <span className="text-neutral-500">({provider.reviewCount} {t('reviews')})</span>
                                                <span className="text-neutral-300">•</span>
                                                <span className="text-neutral-600">{provider.completedJobs} {t('completedJobs')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-neutral-500">{tCommon('location')}</div>
                                                <div className="font-medium text-neutral-900">{provider.location}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-neutral-500">{t('responseTime')}</div>
                                                <div className="font-medium text-neutral-900">{provider.responseTime}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-neutral-500">{t('languages')}</div>
                                                <div className="font-medium text-neutral-900">{provider.languages.join(', ')}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-neutral-500">Member since</div>
                                                <div className="font-medium text-neutral-900">{provider.memberSince}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-neutral-900 mb-4">{t('about')}</h2>
                            <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                {provider.about}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Services Offered</h2>
                            <div className="space-y-4">
                                {provider.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="border border-neutral-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-neutral-900 mb-1">
                                                    {service.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-neutral-500">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {service.duration} min
                                                    </span>
                                                    <span>•</span>
                                                    <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
                                                        {service.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-primary-600">
                                                        {service.price} {tServices('sek')}
                                                    </div>
                                                    <div className="text-sm text-neutral-500">per session</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">{t('portfolio')}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {provider.portfolio.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Portfolio ${index + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">
                                Reviews ({provider.reviewCount})
                            </h2>
                            <div className="space-y-6">
                                {provider.reviews.map((review) => (
                                    <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <Image
                                                src={review.customer.avatar}
                                                alt={review.customer.name}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-900">
                                                            {review.customer.name}
                                                        </h4>
                                                        <p className="text-sm text-neutral-500">{review.date}</p>
                                                    </div>
                                                    {renderStars(review.rating)}
                                                </div>
                                                <p className="text-neutral-600 mb-2">{review.comment}</p>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    {review.service}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Price Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6">
                                <div className="text-center mb-6">
                                    <div className="text-sm text-neutral-500 mb-1">{tCommon('from')}</div>
                                    <div className="text-4xl font-bold text-primary-600">
                                        450 <span className="text-xl text-neutral-500">{tServices('sek')}</span>
                                    </div>
                                    <div className="text-sm text-neutral-500">{tCommon('perHour')}</div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        fullWidth
                                        size="lg"
                                        onClick={() => setShowBookingModal(true)}
                                        className="font-semibold"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {t('bookAppointment')}
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setShowContactModal(true)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        {t('contactProvider')}
                                    </Button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-600">Average response</span>
                                        <span className="font-medium text-neutral-900">{provider.responseTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-600">Completed jobs</span>
                                        <span className="font-medium text-neutral-900">{provider.completedJobs}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-600">Member since</span>
                                        <span className="font-medium text-neutral-900">{provider.memberSince}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-green-900">{t('verifiedProvider')}</div>
                                        <div className="text-sm text-green-700">Identity verified</div>
                                    </div>
                                </div>
                                <div className="text-xs text-green-700 leading-relaxed">
                                    This provider has been verified by MinKompis and has completed our trust & safety checks.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <BookingModal
                    provider={{
                        id: provider.id,
                        name: provider.name,
                        avatar: provider.avatar,
                        responseTime: provider.responseTime,
                        services: provider.services
                    }}
                    onClose={() => setShowBookingModal(false)}
                />
            )}

            {/* Contact Modal */}
            {showContactModal && (
                <ContactModal
                    provider={{
                        id: provider.id,
                        name: provider.name,
                        avatar: provider.avatar,
                        responseTime: provider.responseTime
                    }}
                    onClose={() => setShowContactModal(false)}
                />
            )}

            {/* Image Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Image
                        src={selectedImage}
                        alt="Portfolio"
                        width={1200}
                        height={1200}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}