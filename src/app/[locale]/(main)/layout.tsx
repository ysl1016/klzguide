import { Header, Sidebar, Footer } from '@/components/layout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
