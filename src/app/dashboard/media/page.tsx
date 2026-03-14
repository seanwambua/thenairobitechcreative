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

  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <MediaClient assets={assets} />;
}
