'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function FeaturedProvidersSection() {
  const t = useTranslations('home.featured');
  const tCommon = useTranslations('common');

  // Mock data - Bu sonra API'den gelecek
  const providers = [
    {
      id: '1',
      name: 'Ayşe Yılmaz',
      title: 'Matematik Öğretmeni',
      image: 'https://i.pravatar.cc/200?img=5',
      rating: 5.0,
      reviewCount: 28,
      languages: ['🇹🇷 Türkçe', '🇬🇧 English', '🇸🇪 Svenska'],
      pricePerHour: 350,
      completedJobs: 45,
      responseTime: '2 hours',
      verified: true,
      bio: 'Experienced math teacher with 8 years of experience. Specializing in high school and university level mathematics.',
    },
    {
      id: '2',
      name: 'Mohammed Hassan',
      title: 'Resmi Evrak Tercümanı',
      image: 'https://i.pravatar.cc/200?img=12',
      rating: 4.9,
      reviewCount: 34,
      languages: ['🇸🇦 العربية', '🇸🇪 Svenska', '🇬🇧 English'],
      pricePerHour: 400,
      completedJobs: 67,
      responseTime: '1 hour',
      verified: true,
      bio: 'Certified translator for official documents. Fast and reliable service.',
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      title: 'İsveççe Öğretmeni',
      image: 'https://i.pravatar.cc/200?img=9',
      rating: 4.8,
      reviewCount: 41,
      languages: ['🇪🇸 Español', '🇸🇪 Svenska', '🇬🇧 English'],
      pricePerHour: 300,
      completedJobs: 52,
      responseTime: '3 hours',
      verified: true,
      bio: 'Native Swedish speaker teaching Swedish to immigrants. Patient and experienced.',
    },
    {
      id: '4',
      name: 'Ahmed Ali',
      title: 'Temizlik Uzmanı',
      image: 'https://i.pravatar.cc/200?img=15',
      rating: 5.0,
      reviewCount: 56,
      languages: ['🇸🇴 Soomaali', '🇸🇪 Svenska', '🇬🇧 English'],
      priceFixed: 800,
      completedJobs: 89,
      responseTime: '30 min',
      verified: true,
      bio: 'Professional cleaning service for homes and offices. Eco-friendly products.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4 font-medium">
            <span>⭐</span>
            <span>Top Rated</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {providers.map((provider, index) => (
            <div 
              key={provider.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-100 hover:border-primary-200 hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Image & Verified Badge */}
              <div className="relative">
                <img 
                  src={provider.image} 
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {provider.verified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {tCommon('verified')}
                  </div>
                )}

                {/* Stats Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{provider.rating}</span>
                    <span className="text-neutral-400">({provider.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {provider.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">{provider.title}</p>

                {/* Languages */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {provider.languages.slice(0, 2).map((lang, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-neutral-100 px-2 py-1 rounded-md"
                    >
                      {lang}
                    </span>
                  ))}
                  {provider.languages.length > 2 && (
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded-md text-neutral-600">
                      +{provider.languages.length - 2}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 pb-4 border-b border-neutral-100">
                  <div className="text-2xl font-bold text-neutral-900">
                    {provider.pricePerHour && `${provider.pricePerHour} kr`}
                    {provider.priceFixed && `${provider.priceFixed} kr`}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {provider.pricePerHour && tCommon('perHour')}
                    {provider.priceFixed && 'fixed price'}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between text-xs text-neutral-600 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{provider.completedJobs} jobs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{provider.responseTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/providers/${provider.id}`}>
                  <Button 
                    fullWidth 
                    size="sm"
                    variant="primary"
                    className="group-hover:shadow-lg transition-shadow"
                  >
                    {tCommon('viewProfile')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/services">
            <Button 
              size="lg" 
              variant="outline"
              className="px-8"
            >
              {tCommon('seeAll')} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
