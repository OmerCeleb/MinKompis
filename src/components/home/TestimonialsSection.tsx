// src/components/home/TestimonialsSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function TestimonialsSection() {
    const t = useTranslations('home.testimonials');
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Ayşe Yılmaz',
            role: 'Parent',
            location: 'Istanbul → Stockholm',
            image: 'https://i.pravatar.cc/150?img=5',
            rating: 5,
            text: 'MinKompis sayesinde Türkçe konuşan harika bir matematik öğretmeni buldum. Kızım artık matematiği seviyor ve notları çok yükseldi.',
            service: 'Math Tutoring',
        },
        {
            name: 'Mohammed Hassan',
            role: 'Entrepreneur',
            location: 'Damascus → Göteborg',
            image: 'https://i.pravatar.cc/150?img=12',
            rating: 5,
            text: 'I needed help with my residence permit documents. Found an amazing Arabic-speaking consultant who guided me through everything step by step.',
            service: 'Document Translation',
        },
        {
            name: 'Maria Rodriguez',
            role: 'Swedish Teacher',
            location: 'Madrid → Malmö',
            image: 'https://i.pravatar.cc/150?img=9',
            rating: 5,
            text: 'Como profesora de sueco, MinKompis me conectó con muchos estudiantes hispanohablantes. La plataforma es intuitiva y me permite gestionar todo fácilmente.',
            service: 'Service Provider',
        },
        {
            name: 'Ahmed Ali',
            role: 'Business Owner',
            location: 'Mogadishu → Stockholm',
            image: 'https://i.pravatar.cc/150?img=15',
            rating: 5,
            text: 'Started my cleaning business through MinKompis 8 months ago. Now I have 20+ regular clients and stable income. The platform handles everything professionally.',
            service: 'Service Provider',
        },
        {
            name: 'Elena Popov',
            role: 'Student',
            location: 'Sofia → Uppsala',
            image: 'https://i.pravatar.cc/150?img=20',
            rating: 5,
            text: 'Намерих перфектен учител по шведски който говори български! Комуникацията беше много лесна и напредъкът ми е невероятен.',
            service: 'Swedish Lessons',
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Minimal Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Clean Testimonial Display */}
                <div className="relative max-w-4xl mx-auto mb-16">

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 hidden lg:flex w-12 h-12 items-center justify-center rounded-full border-2 border-neutral-200 bg-white hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all group"
                        aria-label="Previous"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 hidden lg:flex w-12 h-12 items-center justify-center rounded-full border-2 border-neutral-200 bg-white hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all group"
                        aria-label="Next"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Testimonial Card */}
                    <div className="bg-neutral-50 rounded-3xl p-12 border border-neutral-200">

                        {/* Rating Stars */}
                        <div className="flex items-center justify-center gap-1 mb-8">
                            {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-center mb-10">
                            <p className="text-2xl text-neutral-800 leading-relaxed font-light">
                                "{testimonials[activeIndex].text}"
                            </p>
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex items-center justify-center gap-4">
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div className="text-left">
                                <div className="font-semibold text-neutral-900">
                                    {testimonials[activeIndex].name}
                                </div>
                                <div className="text-sm text-neutral-600">
                                    {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal Dot Navigation */}
                <div className="flex items-center justify-center gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`transition-all duration-300 ${
                                index === activeIndex
                                    ? 'w-8 h-2 bg-neutral-900 rounded-full'
                                    : 'w-2 h-2 bg-neutral-300 rounded-full hover:bg-neutral-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Clean Stats */}
                <div className="mt-24 pt-12 border-t border-neutral-200">
                    <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
                        <div>
                            <div className="text-4xl font-bold text-neutral-900 mb-1">500+</div>
                            <div className="text-sm text-neutral-500">Kullanıcı</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-neutral-900 mb-1">5.0</div>
                            <div className="text-sm text-neutral-500">Puan</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-neutral-900 mb-1">98%</div>
                            <div className="text-sm text-neutral-500">Memnuniyet</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-neutral-900 mb-1">15+</div>
                            <div className="text-sm text-neutral-500">Dil</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}