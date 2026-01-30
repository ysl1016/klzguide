'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';
import { Home, Search, Shield } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('common');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
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

          {/* Home Button (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
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
