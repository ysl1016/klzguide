'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RedeemCode {
  code: string;
  rewards: string;
  expiry?: string;
  isNew?: boolean;
}

interface RedeemCodeCardProps {
  title: string;
  codes: RedeemCode[];
  noExpiredText: string;
}

export function RedeemCodeCard({ title, codes, noExpiredText }: RedeemCodeCardProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="border-highlight/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="h-5 w-5 text-highlight" />
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground">{noExpiredText}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {codes.map((item) => (
          <div
            key={item.code}
            className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm text-highlight">
                  {item.code}
                </code>
                {item.isNew && (
                  <Badge className="bg-tip text-tip-foreground text-xs">
                    NEW
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {item.rewards}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'shrink-0 h-8 w-8',
                copiedCode === item.code && 'text-tip'
              )}
              onClick={() => copyToClipboard(item.code)}
            >
              {copiedCode === item.code ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
