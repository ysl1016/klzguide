'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Gift, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RedeemCode } from '@/types/common';

interface ActiveCodesWidgetProps {
  codes: RedeemCode[];
  lastUpdated: string;
}

export function ActiveCodesWidget({ codes, lastUpdated }: ActiveCodesWidgetProps) {
  const locale = useLocale() as 'ko' | 'vi' | 'en';
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale] ?? en);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeCodes = codes.filter((c) => c.isActive);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (activeCodes.length === 0) return null;

  return (
    <Card className="border-highlight/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-highlight" />
            {l('활성 리딤 코드', 'Mã đổi thưởng', 'Active Redeem Codes')}
          </CardTitle>
          <Link href={`/${locale}/economy/redeem-codes`}>
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
              {l('전체 보기', 'Xem tất cả', 'View All')}
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          {l('업데이트', 'Cập nhật', 'Updated')}: {lastUpdated}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {activeCodes.slice(0, 4).map((item) => (
          <div
            key={item.code}
            className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-secondary/50 border border-border"
          >
            <div className="flex items-center gap-2 min-w-0">
              <code className="font-mono text-sm text-highlight truncate">
                {item.code}
              </code>
              {item.isNew && (
                <Badge className="bg-tip text-tip-foreground text-[10px] px-1.5 py-0">
                  NEW
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'shrink-0 h-7 w-7',
                copiedCode === item.code && 'text-tip'
              )}
              onClick={() => copyToClipboard(item.code)}
            >
              {copiedCode === item.code ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        ))}
        {activeCodes.length > 4 && (
          <p className="text-xs text-center text-muted-foreground">
            +{activeCodes.length - 4} {l('개 더보기', 'thêm', 'more')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
