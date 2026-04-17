import { Card, CardContent } from '@/components/ui/card';

export default function HeroesLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-secondary rounded" />
          <div className="h-4 w-full max-w-md bg-secondary rounded" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-secondary rounded" />
          ))}
        </div>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(15)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3 space-y-2">
                <div className="aspect-square bg-secondary rounded-lg" />
                <div className="h-4 w-3/4 bg-secondary rounded mx-auto" />
                <div className="h-3 w-1/2 bg-secondary rounded mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
