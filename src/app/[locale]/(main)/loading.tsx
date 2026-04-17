import { Card, CardContent } from '@/components/ui/card';

// Default Suspense fallback for all (main) routes without their own loading.tsx.
// Individual routes can override with route-specific skeletons.
export default function MainLoading() {
  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-28 bg-secondary rounded" />
          <div className="h-8 w-2/3 max-w-md bg-secondary rounded" />
          <div className="h-4 w-full max-w-xl bg-secondary rounded" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-secondary rounded" />
                <div className="h-4 w-full bg-secondary rounded" />
                <div className="h-4 w-2/3 bg-secondary rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
