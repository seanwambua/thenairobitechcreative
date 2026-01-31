import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';
import { getUsers } from '@/app/actions/admin';
import { UsersClient } from './users-client';

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }
  const users = await getUsers();
  return <UsersClient initialUsers={users} />;
}
