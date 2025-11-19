// src/components/home/CTASection.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function CTASection() {
    const t = useTranslations('home.cta');

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

            {/* Subtle Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>

            {/* Minimal Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Clean Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Başlamaya hazır mısın?
                    </h2>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        Kendi dilinde güvenilir hizmetler keşfet veya sunmaya başla
                    </p>
                </div>

                {/* Two Clean Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Customer Card */}
                    <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-2xl">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 backdrop-blur-sm border border-blue-500/20">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('customerTitle')}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                                {t('customerDesc')}
                            </p>
                        </div>

                        <Link href="/services" className="block">
                            <Button
                                size="lg"
                                className="w-full bg-white text-neutral-900 hover:bg-neutral-100 group-hover:shadow-xl transition-all"
                            >
                                {t('customerButton')}
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </Link>
                    </div>

                    {/* Provider Card */}
                    <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-2xl">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 mb-6 backdrop-blur-sm border border-orange-500/20">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('providerTitle')}
                            </h3>
                            <p className="text-neutral-300 leading-relaxed">
                                {t('providerDesc')}
                            </p>
                        </div>

                        <Link href="/auth/register/provider" className="block">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-neutral-900 group-hover:shadow-xl transition-all backdrop-blur-sm"
                            >
                                {t('providerButton')}
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </Link>
                    </div>

                </div>

                {/* Minimal Stats */}
                <div className="mt-24 pt-12 border-t border-white/10">
                    <div className="grid grid-cols-4 gap-8 text-center max-w-3xl mx-auto">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">500+</div>
                            <div className="text-sm text-neutral-400">Sağlayıcı</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">15+</div>
                            <div className="text-sm text-neutral-400">Dil</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">2K+</div>
                            <div className="text-sm text-neutral-400">İş</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">4.9</div>
                            <div className="text-sm text-neutral-400">Puan</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}