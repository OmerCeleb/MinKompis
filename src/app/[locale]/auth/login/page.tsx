'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function LoginPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Backend integration
    console.log('Login attempt:', { email, password });
    
    setTimeout(() => {
      setLoading(false);
      alert('Login functionality will be connected to backend');
    }, 1000);
  };

  const handleBankID = () => {
    alert('BankID integration coming soon!');
  };

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
          {t('loginTitle')}
        </h1>
        <p className="text-neutral-600">
          {t('welcomeBack')}
        </p>
      </div>

      {/* BankID Login (Primary) */}
      <button
        onClick={handleBankID}
        className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-4 font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>{t('loginWith')} BankID</span>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t('recommended')}</span>
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-neutral-200"></div>
        <span className="px-4 text-sm text-neutral-500">{t('orContinueWith')}</span>
        <div className="flex-1 h-px bg-neutral-200"></div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500" />
            <span className="ml-2 text-sm text-neutral-600">{t('rememberMe')}</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            {t('forgotPassword')}
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={loading}
          className="font-semibold"
        >
          {loading ? t('signingIn') : t('loginTitle')}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          {t('noAccount')}{' '}
          <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
            {t('signUp')}
          </Link>
        </p>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <strong className="font-semibold">{t('bankIdRecommended')}</strong>
            <p className="mt-1 text-blue-700">{t('bankIdInfo')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
