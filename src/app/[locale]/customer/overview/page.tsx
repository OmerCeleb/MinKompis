// src/app/[locale]/customer/overview/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/hooks';

export default function CustomerOverviewPage() {
    const t = useTranslations('customer');
    const tCommon = useTranslations('common');
    const { user } = useAuth();

    // Mock stats
    const stats = [
        {
            label: t('stats.totalBookings'),
            value: '12',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: t('stats.activeBookings'),
            value: '3',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'bg-green-100 text-green-600'
        },
        {
            label: t('stats.completedBookings'),
            value: '9',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'bg-purple-100 text-purple-600'
        },
        {
            label: t('stats.favorites'),
            value: '5',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            color: 'bg-pink-100 text-pink-600'
        }
    ];

    // Mock upcoming bookings
    const upcomingBookings = [
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=47',
                service: 'Swedish Language Lessons'
            },
            date: '2024-11-05',
            time: '14:00',
            status: 'CONFIRMED'
        },
        {
            id: '2',
            provider: {
                name: 'Mohammed Hassan',
                avatar: 'https://i.pravatar.cc/150?img=33',
                service: 'Immigration Consultation'
            },
            date: '2024-11-07',
            time: '10:00',
            status: 'PENDING'
        }
    ];

    return (
        <div className="space-y-6 pb-20 md:pb-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                    {t('welcomeBack')}, {user?.firstName}! 👋
                </h1>
                <p className="text-primary-100 text-sm lg:text-base">
                    {t('overviewSubtitle')}
                </p>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-neutral-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3 lg:mb-4`}>
                            {stat.icon}
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-neutral-900 mb-1">
                            {stat.value}
                        </div>
                        <div className="text-xs lg:text-sm text-neutral-600">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-lg lg:text-xl font-bold text-neutral-900">
                        {t('upcomingBookings')}
                    </h2>
                    <Link
                        href="/customer/bookings"
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm self-start sm:self-auto"
                    >
                        {t('viewAll')} →
                    </Link>
                </div>

                {upcomingBookings.length === 0 ? (
                    <div className="text-center py-8 lg:py-12">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {t('noUpcomingBookings')}
                        </h3>
                        <p className="text-neutral-600 mb-6 text-sm lg:text-base px-4">
                            {t('noUpcomingBookingsDesc')}
                        </p>
                        <Link href="/services">
                            <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors text-sm lg:text-base">
                                {t('browseServices')}
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3 lg:space-y-4">
                        {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                <img
                                    src={booking.provider.avatar}
                                    alt={booking.provider.name}
                                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-neutral-900 text-sm lg:text-base truncate">
                                        {booking.provider.name}
                                    </h3>
                                    <p className="text-xs lg:text-sm text-neutral-600 truncate">
                                        {booking.provider.service}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                                    <div className="text-left sm:text-right">
                                        <div className="text-xs lg:text-sm font-medium text-neutral-900">
                                            {booking.date}
                                        </div>
                                        <div className="text-xs lg:text-sm text-neutral-600">
                                            {booking.time}
                                        </div>
                                    </div>
                                    <span className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                        booking.status === 'CONFIRMED'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions - Responsive Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <Link href="/services">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer h-full">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                            {t('quickActions.findService')}
                        </h3>
                        <p className="text-sm text-neutral-600">
                            {t('quickActions.findServiceDesc')}
                        </p>
                    </div>
                </Link>

                <Link href="/customer/bookings">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                            {t('quickActions.viewBookings')}
                        </h3>
                        <p className="text-sm text-neutral-600">
                            {t('quickActions.viewBookingsDesc')}
                        </p>
                    </div>
                </Link>

                <Link href="/customer/messages">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer h-full sm:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                            {t('quickActions.messages')}
                        </h3>
                        <p className="text-sm text-neutral-600">
                            {t('quickActions.messagesDesc')}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}