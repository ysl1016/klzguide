'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t-2 border-[#FF3B30]/15 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl">
            {t('disclaimer')}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('madeWith')}{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />{' '}
            {t('for')}
          </p>
        </div>
      </div>
    </footer>
  );
}
