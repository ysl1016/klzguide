'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  difficulty?: 'beginner' | 'basic' | 'intermediate' | 'advanced' | 'expert';
  readTime?: number;
  category?: string;
  featured?: boolean;
}

const difficultyColors = {
  beginner: 'badge-beginner',
  basic: 'badge-basic',
  intermediate: 'badge-intermediate',
  advanced: 'badge-advanced',
  expert: 'badge-expert',
};

export function GuideCard({
  title,
  description,
  href,
  difficulty = 'beginner',
  readTime = 5,
  category,
  featured = false,
}: GuideCardProps) {
  const t = useTranslations();

  return (
    <Link href={href}>
      <Card
        className={cn(
          'group h-full transition-all duration-200 hover:border-highlight/50 hover:shadow-lg hover:shadow-highlight/5',
          featured && 'border-highlight/30 bg-card/80'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold group-hover:text-highlight transition-colors">
              {title}
            </CardTitle>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-highlight transition-colors shrink-0" />
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className={cn('text-xs', difficultyColors[difficulty])}
            >
              {t(`difficulty.${difficulty}`)}
            </Badge>
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {readTime} {t('common.minutes')}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
