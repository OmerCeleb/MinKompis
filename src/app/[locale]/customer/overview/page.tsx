// src/app/[locale]/customer/overview/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks';

export default function CustomerOverviewPage() {
    const t = useTranslations('customer');
    const tCommon = useTranslations('common');
    const { user } = useAuth();

    // Mock data - Backend'den gelecek
    const [stats] = useState({
        activeBookings: 2,
        completedBookings: 8,
        favoriteProviders: 5,
        unreadMessages: 3
    });

    const [upcomingBookings] = useState([
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1',
                service: 'Swedish Language Lessons'
            },
            date: '2024-11-20',
            time: '14:00',
            status: 'CONFIRMED',
            price: 450
        },
        {
            id: '2',
            provider: {
                name: 'Elena Popov',
                avatar: 'https://i.pravatar.cc/150?img=20',
                service: 'Document Translation'
            },
            date: '2024-11-22',
            time: '10:00',
            status: 'PENDING',
            price: 350
        }
    ]);

    const [recentMessages] = useState([
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            lastMessage: 'Perfect! See you on Wednesday at 2 PM.',
            time: '2 hours ago',
            unread: true
        },
        {
            id: '2',
            provider: {
                name: 'Mohamed Hassan',
                avatar: 'https://i.pravatar.cc/150?img=12'
            },
            lastMessage: 'I can come tomorrow morning if that works for you.',
            time: '5 hours ago',
            unread: true
        }
    ]);

    const statusColors = {
        CONFIRMED: 'bg-green-100 text-green-800',
        PENDING: 'bg-yellow-100 text-yellow-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
        CANCELLED: 'bg-red-100 text-red-800'
    };

    return (
        <div className="space-y-6">

            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-sm p-6 sm:p-8 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    {t('welcomeBack')}, {user?.firstName}! 👋
                </h1>
                <p className="text-primary-100">
                    {t('overviewSubtitle')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-neutral-600">{t('activeBookings')}</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">{stats.activeBookings}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-neutral-600">{t('completedBookings')}</h3>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">{stats.completedBookings}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-neutral-600">{t('favorites')}</h3>
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">{stats.favoriteProviders}</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-neutral-600">{t('unreadMessages')}</h3>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">{stats.unreadMessages}</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-neutral-900">{t('upcomingBookings')}</h2>
                        <Link
                            href="/customer/bookings"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t('viewAll')}
                        </Link>
                    </div>

                    {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border border-neutral-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={booking.provider.avatar}
                                            alt={booking.provider.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.provider.name}
                                                </h3>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[booking.status as keyof typeof statusColors]}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-600 mb-2">{booking.provider.service}</p>
                                            <div className="flex items-center gap-4 text-xs text-neutral-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {booking.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {booking.time}
                                                </span>
                                                <span className="font-semibold text-primary-600">
                                                    {booking.price} SEK
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-900 mb-2">{t('noUpcomingBookings')}</h3>
                            <p className="text-sm text-neutral-500 mb-4">{t('noUpcomingBookingsDesc')}</p>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {t('findServices')}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recent Messages */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-neutral-900">{t('recentMessages')}</h2>
                        <Link
                            href="/customer/messages"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t('viewAll')}
                        </Link>
                    </div>

                    {recentMessages.length > 0 ? (
                        <div className="space-y-4">
                            {recentMessages.map((message) => (
                                <Link
                                    key={message.id}
                                    href="/customer/messages"
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="relative">
                                        <img
                                            src={message.provider.avatar}
                                            alt={message.provider.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {message.unread && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-semibold text-neutral-900">
                                                {message.provider.name}
                                            </h3>
                                            <span className="text-xs text-neutral-500 whitespace-nowrap">
                                                {message.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-600 line-clamp-2">
                                            {message.lastMessage}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-900 mb-2">{t('noMessages')}</h3>
                            <p className="text-sm text-neutral-500">{t('noMessagesDesc')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">{t('quickActions')}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        href="/services"
                        className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all group"
                    >
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                            <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">{t('findServices')}</h3>
                            <p className="text-sm text-neutral-500">{t('browseProviders')}</p>
                        </div>
                    </Link>

                    <Link
                        href="/customer/bookings"
                        className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all group"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">{t('viewBookings')}</h3>
                            <p className="text-sm text-neutral-500">{t('manageBookings')}</p>
                        </div>
                    </Link>

                    <Link
                        href="/customer/favorites"
                        className="flex items-center gap-4 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all group"
                    >
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                            <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-neutral-900">{t('myFavorites')}</h3>
                            <p className="text-sm text-neutral-500">{t('savedProviders')}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}