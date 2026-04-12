import { Card, CardContent } from '@/components/ui/card';

export default function GoldBarStoreLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-16 bg-secondary rounded" />
            <div className="h-4 w-20 bg-secondary rounded" />
          </div>
          <div className="h-9 w-72 bg-secondary rounded" />
          <div className="h-4 w-96 bg-secondary rounded" />
        </div>
        {/* TL;DR */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-secondary rounded" />
            <div className="h-4 w-2/3 bg-secondary rounded" />
            <div className="h-4 w-1/2 bg-secondary rounded" />
          </CardContent>
        </Card>
        {/* CTA */}
        <div className="h-32 bg-secondary/50 rounded-xl" />
        {/* Steps */}
        <div className="grid gap-3 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <div className="h-8 w-8 bg-secondary rounded-full" />
                <div className="h-4 w-3/4 bg-secondary rounded" />
                <div className="h-3 w-full bg-secondary rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* More sections */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="h-5 w-48 bg-secondary rounded" />
            <div className="h-4 w-full bg-secondary rounded" />
            <div className="h-4 w-3/4 bg-secondary rounded" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
