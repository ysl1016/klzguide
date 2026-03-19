import { Card, CardContent } from '@/components/ui/card';

export default function HeroDetailLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-32 bg-secondary rounded" />
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 bg-secondary rounded-2xl" />
          <div className="flex-1 space-y-2">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-secondary rounded" />
              <div className="h-6 w-20 bg-secondary rounded" />
              <div className="h-6 w-14 bg-secondary rounded" />
            </div>
          </div>
        </div>
        <div className="h-10 w-full bg-secondary rounded" />
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-secondary rounded" />
            <div className="h-4 w-1/2 bg-secondary rounded" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3 space-y-2">
                <div className="h-3 w-12 bg-secondary rounded mx-auto" />
                <div className="h-6 w-10 bg-secondary rounded mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
