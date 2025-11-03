'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">M</span>
              </div>
              <span className="text-2xl font-bold text-white">{tCommon('appName')}</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              {tFooter('tagline')}
            </p>
            
            <div className="flex items-center gap-3">
              <Link href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">f</span>
              </Link>
              <Link href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">in</span>
              </Link>
              <Link href="#" className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">ig</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{tFooter('browseServices')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {tFooter('browseServices')}
                </Link>
              </li>
              <li>
                <Link href="/auth/register/provider" className="hover:text-white transition-colors">
                  {tFooter('becomeProvider')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tFooter('aboutUs')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{tFooter('helpCenter')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  {tFooter('helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  {tFooter('safety')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tFooter('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-neutral-400">
            © {currentYear} {tCommon('appName')}. {tFooter('allRightsReserved')}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {tFooter('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {tFooter('terms')}
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              {tFooter('cookies')}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-500 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>SSL Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-blue-500">✓</span>
              <span>Verified Providers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-500">★</span>
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
