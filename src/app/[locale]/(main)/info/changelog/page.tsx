import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, History, CalendarDays } from 'lucide-react';
import changelogData from '@/data/changelog.json';

interface ChangelogEntry {
  date: string;
  isNew?: boolean;
  changes: {
    ko: string[];
    vi: string[];
    en: string[];
  };
}

// Check if a date is within the last 14 days
function isRecent(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ChangelogContent locale={locale} />;
}

function ChangelogContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const entries = changelogData as ChangelogEntry[];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              3 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <History className="h-8 w-8 text-highlight" />
            {l('업데이트 내역', 'Lịch sử cập nhật', 'Changelog')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '사이트의 최신 업데이트 내역을 확인하세요.',
              'Xem lịch sử cập nhật mới nhất của website.',
              'Check the latest updates to the site.'
            )}
          </p>
        </div>

        {/* Changelog List */}
        <div className="space-y-4">
          {entries.map((entry, idx) => {
            const showNewBadge = entry.isNew || isRecent(entry.date);
            const changes = (entry.changes as Record<string, string[]>)[locale] ?? entry.changes.en;

            return (
              <Card key={idx}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-lg">{entry.date}</span>
                    {showNewBadge && (
                      <Badge className="bg-highlight text-highlight-foreground">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <ul className="space-y-2 ml-8">
                    {changes.map((change, changeIdx) => (
                      <li
                        key={changeIdx}
                        className="text-muted-foreground flex items-baseline gap-2"
                      >
                        <span className="text-highlight">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
