import { getSetting } from '@/app/actions/settings';
import { placeholderImages } from '@/lib/placeholder-images';
import { DashboardClient } from './dashboard-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoUrl, founderImage] = await Promise.all([
    getSetting('logo'),
    getSetting('founderImage'),
  ]);

  return (
    <DashboardClient
      logoUrl={logoUrl}
      founderImage={founderImage ?? placeholderImages.founder.imageUrl}
    >
      {children}
    </DashboardClient>
  );
}
