'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CategoriesSection() {
  const t = useTranslations('home.categories');
  const tCat = useTranslations('categories');

  const categories = [
    {
      slug: 'education',
      name: tCat('education'),
      desc: tCat('educationDesc'),
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
      providers: 45,
    },
    {
      slug: 'home',
      name: tCat('home'),
      desc: tCat('homeDesc'),
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
      providers: 78,
    },
    {
      slug: 'official',
      name: tCat('official'),
      desc: tCat('officialDesc'),
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
      providers: 32,
    },
    {
      slug: 'health',
      name: tCat('health'),
      desc: tCat('healthDesc'),
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
      providers: 28,
    },
    {
      slug: 'business',
      name: tCat('business'),
      desc: tCat('businessDesc'),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      providers: 21,
    },
    {
      slug: 'creative',
      name: tCat('creative'),
      desc: tCat('creativeDesc'),
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80',
      providers: 19,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-full mb-4 font-medium">
            <span>🎯</span>
              {t('browseServices')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="relative p-8 h-64 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {category.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="text-sm font-semibold">{category.providers} {t('providers')}</span>
                  </div>
                  <div className="bg-white text-neutral-900 p-2 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
