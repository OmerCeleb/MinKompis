// src/app/[locale]/dashboard/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth, useBooking } from '@/hooks';

export default function DashboardOverviewPage() {
    const t = useTranslations('dashboard');
    const tCommon = useTranslations('common');

    const { user } = useAuth();
    const { bookings, getBookingsByStatus, loading } = useBooking();

    const pendingBookings = getBookingsByStatus('PENDING');
    const completedBookings = getBookingsByStatus('COMPLETED');

    // Mock stats (would come from API in real app)
    const stats = [
        {
            label: t('totalEarnings'),
            value: '12,450 SEK',
            change: '+12.5%',
            positive: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: t('completedJobs'),
            value: completedBookings.length.toString(),
            change: '+8.2%',
            positive: true,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: t('activeBookings'),
            value: pendingBookings.length.toString(),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: t('averageRating'),
            value: '4.9',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        }
    ];

    // Get recent bookings (last 5)
    const recentBookings = bookings.slice(0, 5);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-24 bg-neutral-200 rounded-xl"></div>
                <div className="grid md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-neutral-200 rounded-xl"></div>
                    ))}
                </div>
                <div className="h-96 bg-neutral-200 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                    {t('welcomeBack')} {user?.firstName}! 👋
                </h1>
                <p className="text-primary-100">
                    {t('dashboardSubtitle')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                                {stat.icon}
                            </div>
                            {stat.change && (
                                <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-neutral-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-neutral-900">{t('recentBookings')}</h2>
                        <Link
                            href="/dashboard/bookings"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {t('viewAll')} →
                        </Link>
                    </div>
                </div>

                {recentBookings.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            No bookings yet
                        </h3>
                        <p className="text-neutral-600">
                            Your booking requests will appear here
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-neutral-200">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="p-6 hover:bg-neutral-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={booking.customerAvatar || 'https://i.pravatar.cc/150?img=10'}
                                        alt={booking.customerName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-neutral-900">
                                            {booking.serviceName}
                                        </h3>
                                        <p className="text-sm text-neutral-600">
                                            {booking.customerName || 'New Customer'} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-neutral-900">{booking.totalAmount} SEK</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-neutral-100 text-neutral-800'
                                        }`}>
                      {booking.status}
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                <Link href="/dashboard/services">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">{t('addNewService')}</h3>
                        <p className="text-sm text-neutral-600">{t('addNewServiceDesc')}</p>
                    </div>
                </Link>

                <Link href="/dashboard/settings">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">{t('manageAvailability')}</h3>
                        <p className="text-sm text-neutral-600">{t('manageAvailabilityDesc')}</p>
                    </div>
                </Link>

                <Link href="/dashboard/reviews">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-2">{t('viewAnalytics')}</h3>
                        <p className="text-sm text-neutral-600">{t('viewAnalyticsDesc')}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}