import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function HeroCompareLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-64 bg-secondary rounded" />
          <div className="h-4 w-full max-w-lg bg-secondary rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-2">
                <div className="h-9 w-full bg-secondary rounded" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 bg-secondary rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-secondary rounded" />
                    <div className="h-4 w-24 bg-secondary rounded" />
                  </div>
                </div>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 w-20 bg-secondary rounded" />
                    <div className="h-3 w-full bg-secondary rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
