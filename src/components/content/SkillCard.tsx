'use client';

import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Sword, Zap, Globe, Star } from 'lucide-react';
import type { HeroSkill } from '@/types/hero';

const skillTypeConfig: Record<
  string,
  { icon: React.ElementType; label: { ko: string; vi: string }; color: string }
> = {
  normal: {
    icon: Sword,
    label: { ko: '일반공격', vi: 'Tấn công thường' },
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
  active: {
    icon: Zap,
    label: { ko: '액티브', vi: 'Chủ động' },
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  deployment: {
    icon: Globe,
    label: { ko: '전체효력', vi: 'Hiệu lực toàn bộ' },
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  potential: {
    icon: Star,
    label: { ko: '전속 포텐셜', vi: 'Tiềm năng chuyên thuộc' },
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
};

interface SkillCardProps {
  skill: HeroSkill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const locale = useLocale() as 'ko' | 'vi';
  const config = skillTypeConfig[skill.type];
  const Icon = config.icon;

  return (
    <div className="flex gap-3 p-3 rounded-lg border bg-secondary/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{skill.name[locale]}</span>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${config.color}`}>
            {config.label[locale]}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{skill.description[locale]}</p>
      </div>
    </div>
  );
}
