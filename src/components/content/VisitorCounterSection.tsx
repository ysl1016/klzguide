import { getVisitorStats } from '@/lib/visitor-stats';
import { VisitorCounter } from './VisitorCounter';
import { Card, CardContent } from '@/components/ui/card';

export async function VisitorCounterSection({ locale }: { locale: string }) {
  const stats = await getVisitorStats();
  return <VisitorCounter locale={locale} initialStats={stats} />;
}

export function VisitorCounterSkeleton() {
  return (
    <Card className="border-border/50 bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-10">
              <div className="text-center space-y-1.5 animate-pulse">
                <div className="h-4 w-14 bg-muted rounded mx-auto" />
                <div className="h-7 w-16 bg-muted rounded mx-auto" />
              </div>
              {i < 2 && <div className="h-10 w-px bg-border" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
