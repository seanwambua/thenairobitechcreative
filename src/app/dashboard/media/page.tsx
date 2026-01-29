import { getSettings } from '@/app/actions/settings';
import { MediaClient } from './media-client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';

export default async function MediaPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  const settings = await getSettings(['heroImage', 'logo', 'founderImage']);

  return <MediaClient initialSettings={settings} />;
}
