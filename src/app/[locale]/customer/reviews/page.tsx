// src/app/[locale]/customer/reviews/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

interface Review {
    id: string;
    provider: {
        name: string;
        avatar: string;
        service: string;
    };
    rating: number;
    comment: string;
    date: string;
    bookingId: string;
}

export default function CustomerReviewsPage() {
    const t = useTranslations('customer.reviews');
    const tCommon = useTranslations('common');

    // Mock reviews data - Backend'den gelecek
    const [reviews] = useState<Review[]>([
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1',
                service: 'Swedish Language Lessons - Beginner'
            },
            rating: 5,
            comment: 'Excellent teacher! Very patient and explains everything clearly. My Swedish has improved so much in just a few weeks. Highly recommend!',
            date: '2024-11-01',
            bookingId: '1'
        },
        {
            id: '2',
            provider: {
                name: 'Elena Popov',
                avatar: 'https://i.pravatar.cc/150?img=20',
                service: 'Document Translation - Turkish to Swedish'
            },
            rating: 5,
            comment: 'Fast and accurate translation service. Very professional and delivered before the deadline. Will definitely use again!',
            date: '2024-10-28',
            bookingId: '2'
        },
        {
            id: '3',
            provider: {
                name: 'Mohamed Hassan',
                avatar: 'https://i.pravatar.cc/150?img=12',
                service: 'Home Cleaning Service'
            },
            rating: 4,
            comment: 'Good cleaning service. Very thorough and professional. Would have liked better communication about arrival time.',
            date: '2024-10-25',
            bookingId: '3'
        },
        {
            id: '4',
            provider: {
                name: 'Ali Demir',
                avatar: 'https://i.pravatar.cc/150?img=14',
                service: 'Personal Training Session'
            },
            rating: 5,
            comment: 'Amazing trainer! Created a perfect workout plan for my goals. Very motivating and knowledgeable.',
            date: '2024-10-20',
            bookingId: '4'
        }
    ]);

    const [filterRating, setFilterRating] = useState<number | 'all'>('all');

    // Filter reviews
    const filteredReviews = reviews.filter(review =>
        filterRating === 'all' || review.rating === filterRating
    );

    // Calculate stats
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    const ratingCounts = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">{t('title')}</h1>
                <p className="text-neutral-600 mt-1">{t('subtitle')}</p>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Average Rating */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-900 mb-1">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.round(averageRating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-neutral-300'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-neutral-600">{t('averageRating')}</p>
                    </div>

                    {/* Total Reviews */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-900 mb-1">
                            {totalReviews}
                        </div>
                        <p className="text-sm text-neutral-600">{t('totalReviews')}</p>
                    </div>

                    {/* Reviews Written */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-900 mb-1">
                            {reviews.length}
                        </div>
                        <p className="text-sm text-neutral-600">{t('reviewsWritten')}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700">{t('filterByRating')}:</span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilterRating('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                filterRating === 'all'
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                        >
                            {t('all')} ({totalReviews})
                        </button>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => setFilterRating(rating)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                    filterRating === rating
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                <span>{rating}</span>
                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span className="text-xs">({ratingCounts[rating as keyof typeof ratingCounts]})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('noReviews')}</h3>
                        <p className="text-neutral-600 mb-6">{t('noReviewsDesc')}</p>
                        <Link href="/customer/bookings">
                            <Button>{t('viewBookings')}</Button>
                        </Link>
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                            {/* Review Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={review.provider.avatar}
                                    alt={review.provider.name}
                                    className="w-14 h-14 rounded-full flex-shrink-0 border-2 border-neutral-100"
                                />

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <Link
                                                href={`/providers/${review.bookingId}`}
                                                className="font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                                            >
                                                {review.provider.name}
                                            </Link>
                                            <p className="text-sm text-neutral-600">{review.provider.service}</p>
                                        </div>
                                        <span className="text-sm text-neutral-500">{formatDate(review.date)}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < review.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-neutral-300'
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                                <Link href={`/customer/bookings`}>
                                    <Button variant="outline" size="sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {t('viewBooking')}
                                    </Button>
                                </Link>
                                <Link href={`/providers/${review.bookingId}`}>
                                    <Button variant="outline" size="sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {t('viewProvider')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Help Card */}
            {reviews.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 mb-2">{t('helpfulTip')}</h3>
                            <p className="text-neutral-700 text-sm leading-relaxed">
                                {t('helpfulTipDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}