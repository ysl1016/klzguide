import { redirect } from 'next/navigation';

export default async function DailyEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect to full-prep page as daily events content has been split
  redirect(`/${locale}/events/full-prep`);
}
