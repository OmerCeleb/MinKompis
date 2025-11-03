'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function ProviderRegisterPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    languages: [] as string[],
    serviceCategory: '',
    profilePhoto: null as File | null,
    profilePhotoPreview: '',
    portfolioPhotos: [] as File[],
    portfolioPreviewUrls: [] as string[],
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  ];

  const tCategories = useTranslations('categories');
  const categories = [
    { id: 'education', name: tCategories('education'), icon: '📚' },
    { id: 'home', name: tCategories('home'), icon: '🏠' },
    { id: 'official', name: tCategories('official'), icon: '📋' },
    { id: 'health', name: tCategories('health'), icon: '💪' },
    { id: 'business', name: tCategories('business'), icon: '💼' },
    { id: 'creative', name: tCategories('creative'), icon: '🎨' },
  ];

  const toggleLanguage = (code: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(code)
        ? prev.languages.filter(l => l !== code)
        : [...prev.languages, code]
    }));
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file,
        profilePhotoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handlePortfolioPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      portfolioPhotos: [...prev.portfolioPhotos, ...files],
      portfolioPreviewUrls: [...prev.portfolioPreviewUrls, ...newPreviewUrls]
    }));
  };

  const removePortfolioPhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioPhotos: prev.portfolioPhotos.filter((_item, i) => i !== index),
      portfolioPreviewUrls: prev.portfolioPreviewUrls.filter((_item, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('password', formData.password);
    submitData.append('businessName', formData.businessName);
    submitData.append('languages', JSON.stringify(formData.languages));
    submitData.append('serviceCategory', formData.serviceCategory);
    submitData.append('bio', formData.bio);
    
    if (formData.profilePhoto) {
      submitData.append('profilePhoto', formData.profilePhoto);
    }
    
    formData.portfolioPhotos.forEach((photo, index) => {
      submitData.append(`portfolioPhoto${index}`, photo);
    });
    
    console.log('Provider registration:', Object.fromEntries(submitData));
    
    setTimeout(() => {
      setLoading(false);
      alert('Registration will be connected to backend');
    }, 1000);
  };

  const handleBankID = () => {
    alert('BankID registration coming soon!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100 max-w-2xl w-full mx-auto">
      
      <div className="text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">M</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          {t('registerProvider')}
        </h1>
        <p className="text-sm text-neutral-600">
          {t('providerDesc')}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              step >= s ? 'bg-blue-500 text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`w-16 h-1 mx-1 transition-all ${
                step > s ? 'bg-blue-500' : 'bg-neutral-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          {step === 1 && t('step1Title')}
          {step === 2 && t('step2Title')}
          {step === 3 && t('step3Title')}
        </h2>
      </div>

      {step === 1 && (
        <>
          <button
            onClick={handleBankID}
            className="w-full mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>{t('registerWith')} BankID</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="px-3 text-xs text-neutral-500">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('firstName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t('lastName')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t('businessName')} ({tCommon('optional')})
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('businessNamePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t('email')} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t('phone')} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+46..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t('password')} *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t('confirmPassword')} *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button type="submit" fullWidth className="font-semibold">
              {tCommon('continue')} →
            </Button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('languagesYouSpeak')} *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => toggleLanguage(lang.code)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      formData.languages.includes(lang.code)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-lg mr-2">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('primaryCategory')} *
              </label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({...formData, serviceCategory: cat.id})}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                      formData.serviceCategory === cat.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                ← {tCommon('back')}
              </Button>
              <Button
                type="submit"
                disabled={formData.languages.length === 0 || !formData.serviceCategory}
                className="flex-1 font-semibold"
              >
                {tCommon('continue')} →
              </Button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('profilePhoto')} ({t('profilePhotoOptional')})
              </label>
              <div className="flex items-start gap-4">
                {formData.profilePhotoPreview ? (
                  <div className="relative">
                    <img 
                      src={formData.profilePhotoPreview} 
                      alt="Profile preview"
                      className="w-32 h-32 rounded-xl object-cover border-2 border-neutral-200"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, profilePhoto: null, profilePhotoPreview: ''})}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="w-32 h-32 border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-neutral-500">{t('addPhoto')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
                <div className="flex-1">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-blue-800">
                        <strong>{t('whyAddPhoto')}</strong>
                        <p className="mt-1 text-blue-700">{t('whyAddPhotoDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('portfolioPhotos')} ({tCommon('optional')})
              </label>
              <p className="text-sm text-neutral-600 mb-3">
                {t('portfolioPhotosDesc')}
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {formData.portfolioPreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-24 rounded-lg object-cover border-2 border-neutral-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePortfolioPhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {formData.portfolioPhotos.length < 6 && (
                  <label className="w-full h-24 border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <svg className="w-6 h-6 text-neutral-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-neutral-500">{t('addPhoto')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePortfolioPhotosChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('aboutYou')} ({tCommon('optional')})
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                maxLength={500}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={t('aboutYouPlaceholder')}
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.bio.length}/500 {t('characterCount')}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-green-800">
                  <strong>{t('completeProfileTitle')}</strong>
                  <p className="mt-1 text-green-700">{t('completeProfileDesc')}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                ← {tCommon('back')}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 font-semibold"
              >
                {loading ? t('creatingAccount') : t('createAccount')}
              </Button>
            </div>
          </form>
        </>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600">
          {t('hasAccount')}{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            {tCommon('login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
