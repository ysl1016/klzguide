import { Card, CardContent } from '@/components/ui/card';

export default function TierListLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-56 bg-secondary rounded" />
          <div className="h-4 w-full max-w-lg bg-secondary rounded" />
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-secondary rounded" />
          ))}
        </div>
        {['S+', 'S', 'A', 'B'].map((tier) => (
          <Card key={tier}>
            <CardContent className="p-4">
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 bg-secondary rounded-lg shrink-0" />
                <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square bg-secondary rounded" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
