import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CPCalculatorLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-56 bg-secondary rounded" />
          <div className="h-4 w-full max-w-lg bg-secondary rounded" />
        </div>
        <Card>
          <CardHeader>
            <div className="h-5 w-40 bg-secondary rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid grid-cols-[120px_1fr] gap-3 items-center">
                <div className="h-4 w-20 bg-secondary rounded" />
                <div className="h-10 bg-secondary rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3 text-center">
            <div className="h-4 w-32 bg-secondary rounded mx-auto" />
            <div className="h-12 w-48 bg-secondary rounded mx-auto" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
