'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function RegisterTypePage() {
  const t = useTranslations('auth');

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100">
      
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <span className="text-2xl font-bold text-neutral-900">MinKompis</span>
        </Link>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('registerTitle')}
        </h1>
        <p className="text-neutral-600">
          {t('chooseAccountType')}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        
        {/* Customer Option */}
        <Link
          href="/auth/register/customer"
          className="block group"
        >
          <div className="border-2 border-neutral-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                <span className="text-2xl">🔍</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {t('registerCustomer')}
                </h3>
                <p className="text-sm text-neutral-600">
                  {t('customerDesc')}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-neutral-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('customerBenefit1')}
                  </span>
                  <span>•</span>
                  <span>{t('customerBenefit2')}</span>
                </div>
              </div>
              <svg className="w-6 h-6 text-neutral-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Provider Option */}
        <Link
          href="/auth/register/provider"
          className="block group"
        >
          <div className="border-2 border-neutral-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">💼</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {t('registerProvider')}
                </h3>
                <p className="text-sm text-neutral-600">
                  {t('providerDesc')}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-neutral-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('providerBenefit1')}
                  </span>
                  <span>•</span>
                  <span>{t('providerBenefit2')}</span>
                </div>
              </div>
              <svg className="w-6 h-6 text-neutral-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Already have account */}
      <div className="text-center pt-6 border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            {t('logIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}
