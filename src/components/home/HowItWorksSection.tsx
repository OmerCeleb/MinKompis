'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function HowItWorksSection() {
  const t = useTranslations('home.howItWorks');
  const [activeTab, setActiveTab] = useState<'customer' | 'provider'>('customer');

  const customerSteps = [
    {
      number: '1',
      title: t('step1Customer.title'),
      desc: t('step1Customer.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '2',
      title: t('step2Customer.title'),
      desc: t('step2Customer.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      number: '3',
      title: t('step3Customer.title'),
      desc: t('step3Customer.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: '4',
      title: t('step4Customer.title'),
      desc: t('step4Customer.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const providerSteps = [
    {
      number: '1',
      title: t('step1Provider.title'),
      desc: t('step1Provider.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '2',
      title: t('step2Provider.title'),
      desc: t('step2Provider.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      number: '3',
      title: t('step3Provider.title'),
      desc: t('step3Provider.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: '4',
      title: t('step4Provider.title'),
      desc: t('step4Provider.desc'),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const steps = activeTab === 'customer' ? customerSteps : providerSteps;

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4 font-medium">
              {t('simpleProcess')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-neutral-200">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'customer'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {t('forCustomers')}
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'provider'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {t('forProviders')}
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 to-orange-200"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`,
                opacity: 0
              }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-neutral-100 relative z-10">
                {/* Number Badge */}
                <div className={`absolute -top-5 left-8 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`text-white bg-gradient-to-br ${step.color} p-4 rounded-2xl mb-6 mt-6 inline-block`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
