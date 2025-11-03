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
      text: 'MinKompis sayesinde Türkçe konuşan harika bir matematik öğretmeni buldum. Kızım artık matematiği seviyor ve notları çok yükseldi. Hem güvenli hem de kullanımı kolay!',
      service: 'Math Tutoring',
      date: 'October 2024'
    },
    {
      name: 'Mohammed Hassan',
      role: 'Entrepreneur',
      location: 'Damascus → Göteborg',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'I needed help with my residence permit documents. Found an amazing Arabic-speaking consultant who guided me through everything step by step. Professional, fast, and reliable!',
      service: 'Document Translation',
      date: 'September 2024'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Swedish Teacher',
      location: 'Madrid → Malmö',
      image: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: 'Como profesora de sueco, MinKompis me conectó con muchos estudiantes hispanohablantes. La plataforma es intuitiva y me permite gestionar todo fácilmente. ¡Muy recomendable!',
      service: 'Service Provider',
      date: 'August 2024'
    },
    {
      name: 'Ahmed Ali',
      role: 'Cleaning Business Owner',
      location: 'Mogadishu → Stockholm',
      image: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      text: 'Started my cleaning business through MinKompis 8 months ago. Now I have 20+ regular clients and stable income. The platform handles everything professionally. Best decision ever!',
      service: 'Service Provider',
      date: 'July 2024'
    },
    {
      name: 'Elena Popov',
      role: 'Student',
      location: 'Sofia → Uppsala',
      image: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      text: 'Намерих перфектен учител по шведски който говори български! Комуникацията беше много лесна и напредъкът ми е невероятен. MinKompis направи всичко толкова по-удобно.',
      service: 'Swedish Lessons',
      date: 'November 2024'
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4 font-medium">
            <span className="text-yellow-500">★★★★★</span>
            <span>5.0 Average Rating</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative">
            
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100">
              <div className="lg:flex">
                
                {/* Left Side - Image & Info */}
                <div className="lg:w-2/5 relative bg-gradient-to-br from-primary-500 to-primary-600 p-8 lg:p-12 text-white">
                  <div className="relative z-10">
                    <img 
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-32 h-32 rounded-2xl object-cover mb-6 border-4 border-white/20 shadow-xl mx-auto lg:mx-0"
                    />
                    
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-bold mb-2">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-primary-100 mb-1">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-sm text-primary-200 mb-4 flex items-center justify-center lg:justify-start gap-2">
                        <span>📍</span>
                        {testimonials[activeIndex].location}
                      </p>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-300 text-xl">★</span>
                        ))}
                      </div>

                      {/* Service Badge */}
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                        {testimonials[activeIndex].service}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Pattern */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-br-full"></div>
                </div>

                {/* Right Side - Testimonial Content */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  
                  {/* Quote Icon */}
                  <svg className="w-16 h-16 text-primary-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  {/* Testimonial Text */}
                  <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed mb-8 font-light italic">
                    "{testimonials[activeIndex].text}"
                  </p>

                  {/* Bottom Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{testimonials[activeIndex].date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-600 font-medium">Verified Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex items-center justify-center gap-3 mb-16 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 transition-all duration-300 ${
                index === activeIndex
                  ? 'scale-100 ring-4 ring-primary-400 ring-offset-2'
                  : 'scale-75 opacity-40 hover:opacity-70 hover:scale-90'
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover"
              />
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-sm text-neutral-600 font-medium">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">
              5.0
            </div>
            <div className="text-sm text-neutral-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-sm text-neutral-600 font-medium">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-2">
              15+
            </div>
            <div className="text-sm text-neutral-600 font-medium">Languages</div>
          </div>
        </div>
      </div>
    </section>
  );
}
