import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';
import { MediaClient } from './media-client';
import prisma from '@/lib/prisma';

export default async function MediaPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  let assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' }
  });

  if (assets.length === 0) {
    const settings = await prisma.settings.findMany();
    assets = settings.map(setting => ({
      id: setting.id,
      name: setting.key,
      url: setting.value ?? '',
      alt: `Image for ${setting.key}`,
      createdAt: setting.createdAt,
      updatedAt: setting.updatedAt,
    }));
  }

  return <MediaClient assets={assets} />;
}
