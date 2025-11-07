'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/shared';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/services?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <section className="relative min-h-[800px] flex items-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
          alt="People working together"
          className="w-full h-full object-cover"
        />
        {/* Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-900/90 to-amber-800/85"></div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-amber-100 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="flex-1 py-4 text-lg border-0 focus:outline-none bg-transparent text-neutral-800 placeholder-neutral-400"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {t('searchButton')}
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/40?img=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">500+ Happy Customers</div>
                  <div className="flex items-center gap-1 text-amber-200">
                    <span>★★★★★</span>
                    <span className="text-xs">4.8/5</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified Providers</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm text-amber-200">{t('stats.languages')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">4.8★</div>
                <div className="text-sm text-amber-200">{t('stats.rating')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-amber-200">{t('stats.support')}</div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://i.pravatar.cc/60?img=5" 
                    alt="Provider"
                    className="w-12 h-12 rounded-full border-2 border-primary-200"
                  />
                  <div>
                    <div className="font-semibold text-neutral-800">Ayşe K.</div>
                    <div className="text-sm text-neutral-600">Math Teacher</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  ★★★★★ <span className="text-neutral-600 text-sm ml-1">5.0</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">🇹🇷 Türkçe</span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">🇬🇧 English</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://i.pravatar.cc/60?img=7" 
                    alt="Provider"
                    className="w-12 h-12 rounded-full border-2 border-green-200"
                  />
                  <div>
                    <div className="font-semibold text-neutral-800">Mohammed A.</div>
                    <div className="text-sm text-neutral-600">Translator</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  ★★★★★ <span className="text-neutral-600 text-sm ml-1">4.9</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">🇸🇦 العربية</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">🇸🇪 Svenska</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://i.pravatar.cc/60?img=9" 
                    alt="Provider"
                    className="w-12 h-12 rounded-full border-2 border-purple-200"
                  />
                  <div>
                    <div className="font-semibold text-neutral-800">Maria S.</div>
                    <div className="text-sm text-neutral-600">Swedish Tutor</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  ★★★★★ <span className="text-neutral-600 text-sm ml-1">4.8</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">🇪🇸 Español</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">🇸🇪 Svenska</span>
                </div>
              </div>

              {/* Card 4 - CTA */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center text-white text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl mb-3">🎯</div>
                <div className="font-bold mb-2">Become a Provider</div>
                <div className="text-sm text-primary-100 mb-4">Start earning today</div>
                <Link href="/auth/register/provider">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-neutral-100"
                  >
                    Join Now →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm animate-bounce">
              ✓ Verified
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm">
              💬 Instant Chat
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
