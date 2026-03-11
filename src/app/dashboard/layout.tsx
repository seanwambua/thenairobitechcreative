import { getSetting } from '@/lib/actions/settings';
import DashboardClient from './dashboard-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = await getSetting('logo');

  return <DashboardClient logoUrl={logoUrl}>{children}</DashboardClient>;
}
