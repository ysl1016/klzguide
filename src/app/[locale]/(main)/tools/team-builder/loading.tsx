import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function TeamBuilderLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-72 bg-secondary rounded" />
          <div className="h-4 w-full max-w-xl bg-secondary rounded" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader className="space-y-2">
              <div className="h-5 w-40 bg-secondary rounded" />
              <div className="h-3 w-56 bg-secondary rounded" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="aspect-square bg-secondary rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="h-5 w-32 bg-secondary rounded" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-secondary rounded" />
              ))}
              <div className="h-px bg-border" />
              <div className="h-10 w-full bg-secondary rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
