import { Header, Sidebar, Footer, Breadcrumb, PullToRefresh } from '@/components/layout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background screen-glow">
      <Header />
      <Sidebar />
      <PullToRefresh>
        <div className="lg:pl-64">
          <Breadcrumb />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </div>
      </PullToRefresh>
    </div>
  );
}
