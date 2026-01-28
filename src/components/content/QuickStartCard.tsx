'use client';

import { Link } from '@/i18n/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronRight,
  Compass,
  TrendingUp,
  Users,
  Gift,
  Shield,
  Swords,
  Calendar,
  Coins,
  Wrench,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type IconName =
  | 'compass'
  | 'trending-up'
  | 'users'
  | 'gift'
  | 'shield'
  | 'swords'
  | 'calendar'
  | 'coins'
  | 'wrench'
  | 'info';

interface QuickStartCardProps {
  title: string;
  description: string;
  href: string;
  iconName: IconName;
  color?: 'primary' | 'warning' | 'highlight' | 'tip';
}

const colorClasses = {
  primary:
    'from-primary/20 to-transparent border-primary/30 hover:border-primary/50',
  warning:
    'from-warning/20 to-transparent border-warning/30 hover:border-warning/50',
  highlight:
    'from-highlight/20 to-transparent border-highlight/30 hover:border-highlight/50',
  tip: 'from-tip/20 to-transparent border-tip/30 hover:border-tip/50',
};

const iconColorClasses = {
  primary: 'text-primary',
  warning: 'text-warning',
  highlight: 'text-highlight',
  tip: 'text-tip',
};

const iconMap = {
  compass: Compass,
  'trending-up': TrendingUp,
  users: Users,
  gift: Gift,
  shield: Shield,
  swords: Swords,
  calendar: Calendar,
  coins: Coins,
  wrench: Wrench,
  info: Info,
};

export function QuickStartCard({
  title,
  description,
  href,
  iconName,
  color = 'primary',
}: QuickStartCardProps) {
  const Icon = iconMap[iconName];

  return (
    <Link href={href}>
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-200 bg-gradient-to-br',
          colorClasses[color]
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'shrink-0 rounded-lg p-2.5 bg-background/50',
                iconColorClasses[color]
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-highlight transition-colors flex items-center gap-2">
                {title}
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
