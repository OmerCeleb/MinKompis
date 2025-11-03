'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Button } from './';

interface MobileMenuProps {
  navLinks: Array<{ href: string; label: string }>;
  loginText: string;
  registerText: string;
}

const languages = [
  { code: 'tr', flag: '🇹🇷' },
  { code: 'sv', flag: '🇸🇪' },
  { code: 'en', flag: '🇬🇧' },
];

export default function MobileMenu({ navLinks, loginText, registerText }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative z-[60] p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        aria-label="Menu"
        type="button"
      >
        <div className="w-5 h-5 flex flex-col justify-center gap-1">
          <span className={`w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-neutral-800 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      <div 
        className={`fixed inset-0 bg-black/50 z-[50] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-auto max-h-[90vh] w-72 bg-white rounded-bl-2xl shadow-2xl z-[55] lg:hidden transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0 translate-y-0' : 'translate-x-full -translate-y-4'
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <span className="text-base font-semibold text-neutral-900">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close"
              type="button"
            >
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="py-2 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-neutral-100 mx-2"></div>

          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => switchLanguage(language.code)}
                  className={`flex-1 h-10 rounded-lg flex items-center justify-center text-2xl transition-all transform active:scale-95 ${
                    currentLocale === language.code
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                >
                  {language.flag}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-neutral-100 mx-2"></div>

          <div className="p-3 space-y-2">
            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
              <Button 
                fullWidth 
                variant="ghost" 
                size="sm" 
                className="font-medium h-9 text-sm"
              >
                {loginText}
              </Button>
            </Link>
            <Link href="/auth/register/customer" onClick={() => setIsOpen(false)}>
              <Button 
                fullWidth 
                variant="primary" 
                size="sm" 
                className="font-medium h-9 text-sm"
              >
                {registerText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
