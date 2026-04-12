'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';
import { Gem, Home, Search, Shield } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('common');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#FF3B30]/20 bg-background/98 backdrop-blur-sm pt-[env(safe-area-inset-top)]">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary shadow-[0_0_12px_rgba(255,59,48,0.35)]">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                {t('siteName')}
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Last Z: Survival Shooter
              </p>
            </div>
          </Link>
        </div>

        {/* Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar className="w-full" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Gold Bar Store */}
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://store.last-z.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gold Bar Store"
            >
              <Gem className="h-5 w-5 text-yellow-400" />
            </a>
          </Button>

          {/* Home Button (Desktop + Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>

          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <SearchBar autoFocus onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
