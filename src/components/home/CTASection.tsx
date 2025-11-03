'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background - Elegant Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Animated Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content - Centered Split */}
        <div className="max-w-6xl mx-auto">
          
          {/* Top Section - Customer CTA */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Join 500+ satisfied users</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('customerTitle')}
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('customerDesc')}
            </p>

            <Link href="/services">
              <Button 
                size="lg" 
                className="px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-primary-500/50 hover:scale-105 transition-all"
              >
                {t('customerButton')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Secure payments</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Verified providers</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="px-6 text-neutral-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Bottom Section - Provider CTA */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('providerTitle')}
            </h3>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              {t('providerDesc')}
            </p>

            <Link href="/auth/register/provider">
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-5 text-lg font-semibold bg-white/5 border-2 border-white/30 text-white hover:bg-white hover:text-neutral-900 backdrop-blur-sm transition-all hover:scale-105"
              >
                {t('providerButton')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>

            {/* Provider Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-3xl mb-3">🆓</div>
                <div className="text-white font-semibold mb-1">Free to Join</div>
                <div className="text-sm text-neutral-400">No setup or monthly fees</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-3xl mb-3">💰</div>
                <div className="text-white font-semibold mb-1">15% Commission</div>
                <div className="text-sm text-neutral-400">Only when you earn</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-3xl mb-3">⚡</div>
                <div className="text-white font-semibold mb-1">Fast Payouts</div>
                <div className="text-sm text-neutral-400">Get paid within 24 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-neutral-400">Active Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-neutral-400">Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-sm text-neutral-400">Services Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.8★</div>
              <div className="text-sm text-neutral-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
