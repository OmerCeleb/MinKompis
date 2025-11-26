// src/app/[locale]/about/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function AboutPage() {
    const t = useTranslations('about');

    const stats = [
        { value: '500+', label: t('stats.providers'), icon: '👥' },
        { value: '2,000+', label: t('stats.customers'), icon: '😊' },
        { value: '5,000+', label: t('stats.bookings'), icon: '✓' },
        { value: '15+', label: t('stats.languages'), icon: '🌍' },
        { value: '4.8/5', label: t('stats.satisfaction'), icon: '⭐' },
        { value: '< 2h', label: t('stats.responseTime'), icon: '⚡' },
    ];

    const values = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t('values.value1.title'),
            description: t('values.value1.description'),
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: t('values.value2.title'),
            description: t('values.value2.description'),
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: t('values.value3.title'),
            description: t('values.value3.description'),
            gradient: 'from-orange-500 to-red-500',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: t('values.value4.title'),
            description: t('values.value4.description'),
            gradient: 'from-green-500 to-emerald-500',
        },
    ];

    const milestones = [
        {
            year: t('milestones.milestone1.year'),
            title: t('milestones.milestone1.title'),
            description: t('milestones.milestone1.description')
        },
        {
            year: t('milestones.milestone2.year'),
            title: t('milestones.milestone2.title'),
            description: t('milestones.milestone2.description')
        },
        {
            year: t('milestones.milestone3.year'),
            title: t('milestones.milestone3.title'),
            description: t('milestones.milestone3.description')
        },
        {
            year: t('milestones.milestone4.year'),
            title: t('milestones.milestone4.title'),
            description: t('milestones.milestone4.description')
        },
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section - Modern & Minimal */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-amber-50/50"></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
                    backgroundSize: '64px 64px'
                }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-neutral-200 px-4 py-2 rounded-full mb-8">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-neutral-700">{t('hero.badge')}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent leading-tight">
                            {t('hero.title')}
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar - Floating Effect */}
            <section className="relative -mt-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-neutral-100">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-6 md:p-8 text-center group hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 transition-all duration-300">
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                                    <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section - Two Column Layout */}
            <section className="py-24 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left - Image Collage */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                                        alt="Team collaboration"
                                        className="rounded-2xl shadow-lg w-full h-64 object-cover"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                                        alt="Happy customer"
                                        className="rounded-2xl shadow-lg w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="space-y-4 pt-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80"
                                        alt="Service provider"
                                        className="rounded-2xl shadow-lg w-full h-48 object-cover"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                                        alt="Professional"
                                        className="rounded-2xl shadow-lg w-full h-64 object-cover"
                                    />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-xl">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{t('mission.foundingYear')}</div>
                                    <div className="text-sm">{t('mission.foundingLabel')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                                🎯 {t('mission.badge')}
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                                {t('mission.title')}
                            </h2>

                            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                                {t('mission.description')}
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: '🌍', title: t('mission.points.point1.title'), desc: t('mission.points.point1.description') },
                                    { icon: '✅', title: t('mission.points.point2.title'), desc: t('mission.points.point2.description') },
                                    { icon: '🤝', title: t('mission.points.point3.title'), desc: t('mission.points.point3.description') },
                                ].map((point, index) => (
                                    <div key={index} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-2xl">
                                            {point.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-neutral-900 mb-1">{point.title}</h3>
                                            <p className="text-neutral-600">{point.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Timeline */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                            📖 {t('story.badge')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                            {t('story.title')}
                        </h2>
                    </div>

                    {/* Story Content with Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200 hidden md:block"></div>

                        <div className="space-y-12">
                            {[t('story.paragraph1'), t('story.paragraph2'), t('story.paragraph3')].map((paragraph, index) => (
                                <div key={index} className="relative flex gap-8 items-start">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg hidden md:flex">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                                        <p className="text-lg text-neutral-700 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Milestones */}
                    <div className="mt-20 grid md:grid-cols-4 gap-6">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 mb-4 group-hover:scale-105 transition-transform shadow-lg">
                                    <div className="text-3xl font-bold mb-2">{milestone.year}</div>
                                    <div className="text-sm opacity-90">{milestone.title}</div>
                                </div>
                                <p className="text-sm text-neutral-600">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values - Modern Cards */}
            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '48px 48px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                            💡 {t('values.badge')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('values.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-neutral-300 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Premium Design */}
            <section className="py-24 bg-gradient-to-br from-neutral-50 to-orange-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Customer CTA */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl transform group-hover:scale-105 transition-transform shadow-2xl"></div>
                            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 md:p-12 text-white overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-4xl">
                                        🔍
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                        {t('cta.customer.title')}
                                    </h3>
                                    <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                                        {t('cta.customer.description')}
                                    </p>
                                    <Link href="/services">
                                        <Button
                                            size="lg"
                                            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all group"
                                        >
                                            {t('cta.customer.button')}
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Provider CTA */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl transform group-hover:scale-105 transition-transform shadow-2xl"></div>
                            <div className="relative bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-10 md:p-12 text-white overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-4xl">
                                        💼
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                        {t('cta.provider.title')}
                                    </h3>
                                    <p className="text-orange-100 mb-8 text-lg leading-relaxed">
                                        {t('cta.provider.description')}
                                    </p>
                                    <Link href="/auth/register/provider">
                                        <Button
                                            size="lg"
                                            className="bg-white text-orange-600 hover:bg-orange-50 shadow-xl hover:shadow-2xl transition-all group"
                                        >
                                            {t('cta.provider.button')}
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}