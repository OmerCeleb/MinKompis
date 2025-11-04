// src/app/[locale]/dashboard/reviews/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

interface Review {
    id: string;
    customer: {
        name: string;
        avatar: string;
    };
    rating: number;
    comment: string;
    service: string;
    date: string;
    reply?: string;
}

export default function DashboardReviewsPage() {
    const t = useTranslations('dashboard.reviews');
    const tCommon = useTranslations('common');

    // Mock reviews data
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            customer: {
                name: 'Sarah Johnson',
                avatar: 'https://i.pravatar.cc/150?img=44'
            },
            rating: 5,
            comment: 'Excellent teacher! Very patient and explains everything clearly. My Swedish has improved so much in just a few weeks. Highly recommend!',
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-11-01',
            reply: 'Thank you so much Sarah! It has been a pleasure teaching you. Keep up the great work! 😊'
        },
        {
            id: '2',
            customer: {
                name: 'Ahmed Ali',
                avatar: 'https://i.pravatar.cc/150?img=35'
            },
            rating: 5,
            comment: 'Great experience. Very professional and helpful. Communication was smooth throughout.',
            service: 'Swedish Language Lessons - Intermediate',
            date: '2024-10-28'
        },
        {
            id: '3',
            customer: {
                name: 'Maria Garcia',
                avatar: 'https://i.pravatar.cc/150?img=38'
            },
            rating: 4,
            comment: 'Good lessons overall. Very knowledgeable instructor. Would have liked more focus on pronunciation practice.',
            service: 'Swedish Conversation Practice',
            date: '2024-10-25',
            reply: 'Thank you for the feedback Maria! I will make sure to include more pronunciation exercises in our next session.'
        },
        {
            id: '4',
            customer: {
                name: 'David Lee',
                avatar: 'https://i.pravatar.cc/150?img=42'
            },
            rating: 5,
            comment: 'Fantastic teacher! Made learning Swedish fun and easy to understand. Very flexible with scheduling too.',
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-10-20'
        },
        {
            id: '5',
            customer: {
                name: 'Emma Svensson',
                avatar: 'https://i.pravatar.cc/150?img=47'
            },
            rating: 5,
            comment: 'Best Swedish teacher I have had! Patient, encouraging, and really knows how to explain grammar.',
            service: 'Swedish Language Lessons - Intermediate',
            date: '2024-10-15'
        },
        {
            id: '6',
            customer: {
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=51'
            },
            rating: 4,
            comment: 'Very helpful and professional. Good lesson structure. Would recommend to others.',
            service: 'Swedish Conversation Practice',
            date: '2024-10-10'
        },
        {
            id: '7',
            customer: {
                name: 'Lisa Anderson',
                avatar: 'https://i.pravatar.cc/150?img=48'
            },
            rating: 5,
            comment: 'Amazing lessons! I feel so much more confident speaking Swedish now. Thank you!',
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-10-05'
        }
    ]);

    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    // Calculate stats
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    const ratingCounts = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
    };

    // Filter reviews
    const filteredReviews = reviews.filter(review =>
        filterRating === 'all' || review.rating === filterRating
    );

    const handleReply = (reviewId: string) => {
        if (!replyText.trim()) return;

        setReviews(reviews.map(r =>
            r.id === reviewId ? { ...r, reply: replyText } : r
        ));

        setReplyText('');
        setReplyingTo(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('title')}</h1>
                <p className="text-neutral-600">{t('subtitle')}</p>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* Average Rating */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-neutral-900 mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-neutral-600">{t('averageRating')}</p>
                        <p className="text-xs text-neutral-500 mt-1">{t('basedOn', { count: totalReviews })}</p>
                    </div>
                </div>

                {/* Rating Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:col-span-2">
                    <h3 className="font-semibold text-neutral-900 mb-4">{t('ratingBreakdown')}</h3>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingCounts[rating as keyof typeof ratingCounts];
                            const percentage = (count / totalReviews) * 100;

                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-sm font-medium text-neutral-900">{rating}</span>
                                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm text-neutral-600 w-12 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-neutral-700">{t('filterByRating')}:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterRating('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                filterRating === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                        >
                            {t('all')}
                        </button>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => setFilterRating(rating)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                                    filterRating === rating
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                {rating}
                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
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
                        <p className="text-neutral-600">{t('noReviewsDesc')}</p>
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">

                            {/* Review Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={review.customer.avatar}
                                    alt={review.customer.name}
                                    className="w-12 h-12 rounded-full flex-shrink-0"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-neutral-900">{review.customer.name}</h4>
                                            <p className="text-sm text-neutral-600">{review.service}</p>
                                        </div>
                                        <span className="text-sm text-neutral-500">{formatDate(review.date)}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                                </div>
                            </div>

                            {/* Reply Section */}
                            {review.reply ? (
                                <div className="ml-16 mt-4 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-600">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">You</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-neutral-900 mb-1">{t('yourReply')}</p>
                                            <p className="text-sm text-neutral-700">{review.reply}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : replyingTo === review.id ? (
                                <div className="ml-16 mt-4">
                  <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={t('writeReply')}
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                                    <div className="flex gap-3 mt-3">
                                        <Button
                                            onClick={() => handleReply(review.id)}
                                            size="sm"
                                            disabled={!replyText.trim()}
                                        >
                                            {t('sendReply')}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setReplyingTo(null);
                                                setReplyText('');
                                            }}
                                            size="sm"
                                            variant="outline"
                                        >
                                            {tCommon('cancel')}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="ml-16 mt-4">
                                    <Button
                                        onClick={() => setReplyingTo(review.id)}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                        </svg>
                                        {t('reply')}
                                    </Button>
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>

        </div>
    );
}